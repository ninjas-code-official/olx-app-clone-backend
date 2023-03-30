import React, { useState } from 'react'
import { Image, View, TouchableOpacity } from 'react-native'
import { BorderlessButton } from 'react-native-gesture-handler'
import { useMutation, gql } from '@apollo/client'
import { followUser } from '../../../../apollo/server'
import { TextDefault, UnfollowModal } from '../../../../components'
import { alignment, colors, scale } from '../../../../utilities'
import styles from './styles'
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'
const FOLLOW_USER = gql`${followUser}`

function Card(props) {
    const [modalVisible, setModalVisible] = useState(false)
    const [followers, setfollower] = useState(!!props._id ?? false)
    const [follow, setFollow] = useState()
    const navigation = useNavigation()

    const [ mutate, { loading }] = useMutation(FOLLOW_USER)

    function onModalToggle() {
        setModalVisible(prev => !prev)
    }
    function onFollowing() {
        mutate({
            variables:{
                followStatus: false,
                userId: props._id
            }
        })
        setfollower(prev => !prev)
    }

    function unFollow() {
        mutate({
            variables:{
                followStatus: true,
                userId: props._id
            }
        })
        setfollower(prev => !prev)
    }

    return (
        <>
            <View style={styles.userContainer}>
                <TouchableOpacity activeOpacity={1}
                    onPress={() => navigation.navigate('UserProfile',{ user: props._id})} style={styles.avatar}>
                    <Image style={styles.img} source={require('../../../../assets/images/avatar.png')} />
                </TouchableOpacity >
                <TextDefault textColor={colors.buttonbackground} bold style={[alignment.PLmedium, styles.flex]}>
                    {props.name}
                </TextDefault>
                <BorderlessButton
                    style={alignment.Psmall}
                    onPress={()=> followers ? onModalToggle() : onFollowing()}
                    >
                    {followers ?
                        <Feather name="user-check" size={scale(20)} color="black" /> :
                        <Feather name="user-plus" size={scale(20)} color="black" />
                    }
                </BorderlessButton>
            </View>
            <UnfollowModal modalVisible={modalVisible} onModalToggle={onModalToggle} unFollow={unFollow} name={props.name} />
        </>
    )
}

export default React.memo(Card)