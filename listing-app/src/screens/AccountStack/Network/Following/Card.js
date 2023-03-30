import React, { useState } from 'react'
import { Image, View, TouchableOpacity } from 'react-native'
import { BorderlessButton } from 'react-native-gesture-handler'
import { TextDefault, UnfollowModal } from '../../../../components'
import { alignment, colors, scale } from '../../../../utilities'
import styles from './styles'
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'

function Card(props) {
    const [modalVisible, setModalVisible] = useState(false)
    const navigation = useNavigation()
    const [following, setfollowing] = useState(props._id?? false)

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

    // if (!following)
    //     return null

    return (
        <>
            <View style={styles.userContainer}>
                <TouchableOpacity activeOpacity={1}
                    onPress={() => navigation.navigate('UserProfile', { user: props._id})} style={styles.avatar}>
                    <Image style={styles.img} source={require('../../../../assets/images/avatar.png')}  />
                </TouchableOpacity >
                <TextDefault textColor={colors.buttonbackground} bold style={[alignment.PLmedium, styles.flex]}>
                    {props.name}
                </TextDefault>
                <BorderlessButton
                    style={alignment.Psmall}
                    onPress={()=> onModalToggle()}
                    >
                    <Feather name="user-check" size={scale(20)} color="black" />
                </BorderlessButton>
            </View>
            <UnfollowModal modalVisible={modalVisible} onModalToggle={onModalToggle} onFollowing={onFollowing} name={props.name} />
        </>
    )
}

export default React.memo(Card)