import { gql, useApolloClient, useLazyQuery } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { profile } from '../apollo/server';

const PROFILE = gql`
  ${profile}
`

const UserContext = React.createContext({})

export const UserProvider = props => {
  const client = useApolloClient()
  const [token, setToken] = useState('')
  const [refetchNeeded, setRefetchNeeded] = useState(false)
  const [
    fetchProfile,
    {
      called: calledProfile,
      loading: loadingProfile,
      error: errorProfile,
      data: dataProfile,
      refetch
    }
  ] = useLazyQuery(PROFILE, {
    fetchPolicy: 'network-only',
    onCompleted,
    onError
  })

  useEffect(() => {
    let isSubscribed = true
    ;(async() => {
        await client.resetStore()

      const token = await AsyncStorage.getItem('token')
      isSubscribed && setToken(token)
    })()
    return () => {
      isSubscribed = false
    }
  }, [])

  useEffect(() => {
    if (!token) return
    let isSubscribed = true
    ;(async() => {
      isSubscribed && (await fetchProfile())
    })()
    return () => {
      isSubscribed = false
    }
  }, [token])

  useEffect(() => {
    if (refetchNeeded) {
        setRefetchNeeded(false);
        refetch();
    }
}, [refetchNeeded]);


  function onCompleted({ profile }) {
    //console.log('onCompleted')
  }
  function onError(error) {
    //console.log('error context', JSON.stringify(error))
  }

  const setTokenAsync = async token => {
    await AsyncStorage.setItem('token', token)
    setToken(token)
  }

  const logout = async() => {
    try {
      await AsyncStorage.removeItem('token')
      setToken(null)
      await client.resetStore()
    } catch (error) {
      //console.log('error on logout', error)
    }
  }

  

  return (
    <UserContext.Provider
      value={{
        isLoggedIn: !!token && dataProfile && !!dataProfile.profile,
        loadingProfile: loadingProfile && calledProfile,
        errorProfile,
        profile:
          dataProfile && dataProfile.profile ? dataProfile.profile : null,
        setTokenAsync,
        logout,
        setRefetchNeeded
      }}>
      {props.children}
    </UserContext.Provider>
  )
}

UserProvider.propTypes = {
  children: PropTypes.node
}
export const UserConsumer = UserContext.Consumer
export default UserContext