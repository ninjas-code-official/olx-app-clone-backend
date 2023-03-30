import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useLayoutEffect, useContext } from 'react'
import { View, Image } from 'react-native'
import { useMutation, gql, useQuery } from '@apollo/client'
import { followUser, getUser } from '../../../apollo/server'
import { EmptyButton, RightButton, TextDefault, Spinner, TextError } from '../../../components'
import { alignment, colors } from '../../../utilities'
import styles from './styles'
import moment from 'moment'
import UserContext from '../../../context/user'

const FOLLOW_USER = gql`${followUser}`
const GET_USER = gql`${getUser}`

function UserProfile() {
    const route = useRoute()
    const navigation = useNavigation()
    const user = route.params?.user
    const {loading:userLoading, data: userData, error: userError} = useQuery(GET_USER, { 
        variables:{
            id: user
        }
    })
    const [ mutate, { loading }] = useMutation(FOLLOW_USER, {
        refetchQueries:[{
            query:GET_USER,
            variables:{
                id: user
            }
        }]
    })
    const { profile } = useContext(UserContext)

    useLayoutEffect(() => {
        navigation.setOptions({
            title: null,
            headerRight: () => <RightButton iconColor={colors.headerText} icon='dots' />
        })
    }, [navigation])

    function getDate(date) {
        const formatDate = moment(+date).format('MMM YYYY')
        return formatDate
    }

    if(userLoading){
        return <Spinner spinnerColor={colors.spinnerColor1} backColor='transparent' />
    }

    if(userError){
        return <TextError text={userError.message}  />
    }

    return (
        <View style={[styles.flex, styles.mainContainer]}>
            <View style={styles.profileContainer}>
                <View style={styles.upperContainer}>
                    <View style={styles.imageContainer}>
                        <Image
                            style={styles.imgResponsive}
                            source={require('../../../assets/images/avatar.png')}
                            resizeMode='cover'
                        />
                    </View>
                    <View style={[styles.flex, styles.subContainer]}>
                        <View style={styles.profileInfo}>
                            <View style={styles.follower}>
                                <TextDefault textColor={colors.fontMainColor} H3 bold>
                                    {userData.user.followers.length}
                                </TextDefault>
                                <TextDefault textColor={colors.fontSecondColor} light uppercase>
                                    {'Followers'}
                                </TextDefault>
                            </View>
                            <View style={styles.follower}>
                                <TextDefault textColor={colors.fontMainColor} H3 bold>
                                    {userData.user.following.length}
                                </TextDefault>
                                <TextDefault textColor={colors.fontSecondColor} light uppercase>
                                    {'Following'}
                                </TextDefault>
                            </View>
                        </View>
                        <View style={styles.editButton}>
                            {!userData.user.followers.find(follow => follow._id === profile._id)?<EmptyButton title='Follow'
                                loading={loading}
                                onPress={() => {
                                    mutate({
                                        variables:{
                                            followStatus: false,
                                            userId: user
                                        }
                                    })
                                }} />:
                                <EmptyButton title='Un Follow'
                                loading={loading}
                                onPress={() => {
                                    mutate({
                                        variables:{
                                            followStatus: true,
                                            userId: user
                                        }
                                    })
                                }} />
                                }
                        </View>
                    </View>
                </View>
                <TextDefault H4 bold style={[alignment.MBxSmall, alignment.PLsmall, alignment.MTlarge]}>
                    {userData.user.name}
                </TextDefault>
                <TextDefault textColor={colors.fontSecondColor} bold style={[alignment.MBxSmall, alignment.PLsmall]} uppercase>
                    {`Member since ${getDate(userData.user.createdAt)}`}
                </TextDefault>
            </View>
        </View >
    )
}

export default React.memo(UserProfile)