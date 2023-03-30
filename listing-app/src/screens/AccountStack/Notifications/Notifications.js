import React, { useState, useContext, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Switch, View, Linking, AppState } from 'react-native'
import * as Permissions from 'expo-permissions'
import * as Notifications from 'expo-notifications'
import { useMutation, gql } from '@apollo/client'
import * as Device from 'expo-device'

import { TextDefault, FlashMessage, Spinner } from '../../../components'
import { alignment, colors } from '../../../utilities'
import styles from './styles'
import UserContext from '../../../context/user'

import {
    pushToken,
    updateNotificationStatus,
    profile
} from '../../../apollo/server'

const PUSH_TOKEN = gql`
  ${pushToken}
`
const UPDATE_NOTIFICATION_TOKEN = gql`
  ${updateNotificationStatus}
`

const PROFILE = gql`
  ${profile}
`

function Notification() {
    const navigation = useNavigation()
    const { profile } = useContext(UserContext)
    const [offerNotification, offerNotificationSetter] = useState(profile.isOfferNotification)
    const [appState, setAppState] = useState(AppState.currentState)
    const toggleSwitch = () => offerNotificationSetter(prev => !prev);

    const [uploadToken] = useMutation(PUSH_TOKEN)

    const [mutate, { loading }] = useMutation(UPDATE_NOTIFICATION_TOKEN, {
        onCompleted,
        onError,
        refetchQueries: [{ query: PROFILE }]
    })

    useEffect(() => {
        AppState.addEventListener('change', _handleAppStateChange)
        return () => {
            AppState.removeEventListener('change', _handleAppStateChange)
        }
    }, [])

    useEffect(() => {
        checkPermission()
    }, [navigation])
    const _handleAppStateChange = async nextAppState => {
        if (nextAppState === 'active') {
            let token = null
            const permission = await getPermission()
            if (permission === 'granted') {
                if (!profile.notificationToken) {
                    token = (await Notifications.getExpoPushTokenAsync()).data
                    uploadToken({ variables: { token } })
                }
                offerNotificationSetter(profile.isOfferNotification)
            } else {
                offerNotificationSetter(false)
            }
        }
        setAppState(nextAppState)
    }

    async function checkPermission() {
        const permission = await getPermission()
        if (permission !== 'granted') {
            offerNotificationSetter(false)
        } else {
            offerNotificationSetter(profile.isOfferNotification)
        }
    }

    async function getPermission() {
        const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS)
        return status
    }

    function onCompleted() {
        FlashMessage({
            message: 'Notification Status Updated'
        })
    }

    function onError(error) {
        try {
            FlashMessage({
                message: error.networkError.result.errors[0].message
            })
        } catch (err) { }
    }

    async function updateNotificationStatus(notificationCheck) {
        let offerNotify
        if (!Device.isDevice) {
            FlashMessage({
                message: 'Notification do not work on simulator'
            })
            return
        }

        const permission = await getPermission()
        if (!profile.notificationToken || permission !== 'granted') {
            Linking.openSettings()
        }
        if (notificationCheck === 'offer') {
            offerNotificationSetter(!offerNotification)
            offerNotify = !offerNotification
        }
        mutate({
            variables: {
                offerNotification: offerNotify,
            }
        })
    }
    return (
        <View style={[styles.flex, styles.mainContainer]}>
            <View style={styles.smallContainer}>
                <TextDefault bold H5 style={[alignment.PLlarge, styles.flex]}>
                    {'Special communications & offers'}
                </TextDefault>
                {loading? <View style={{alignSelf:'flex-end'}}><Spinner backColor={'transparent'} spinnerColor={colors.buttonbackground}  size={'small'}/></View>:
                <Switch
                    trackColor={{ false: colors.headerbackground, true: colors.buttonbackground }}
                    thumbColor={colors.containerBox}
                    ios_backgroundColor={colors.headerbackground}
                    onValueChange={() => {
                        updateNotificationStatus('offer')
                    }}
                    value={offerNotification}
                />}
            </View>
            <View style={styles.smallContainer}>
                <TextDefault textColor={colors.fontPlaceholder} bold H5 style={[alignment.PLlarge, styles.flex]}>
                    {'Recomendations'}
                </TextDefault>
                <Switch
                    disabled
                    trackColor={{ false: colors.headerbackground, true: colors.buttonbackground }}
                    thumbColor={colors.containerBox}
                    ios_backgroundColor={colors.headerbackground}
                    onValueChange={toggleSwitch}
                    value={false}
                />
            </View>
        </View>
    )
}
export default React.memo(Notification)