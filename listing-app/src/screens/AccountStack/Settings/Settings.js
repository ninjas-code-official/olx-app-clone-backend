import React, { useContext, useState } from 'react'
import { View, TouchableOpacity, Modal } from 'react-native'
import styles from './styles'
import { DeactivateModal, TextDefault } from '../../../components'
import { alignment, colors, scale } from '../../../utilities'
import { Entypo } from '@expo/vector-icons'
import { StackActions, useNavigation } from '@react-navigation/native'
import UserContext from '../../../context/user'

function Settings() {
    const navigation = useNavigation()
    const { logout } = useContext(UserContext)
    const [modalVisible, setModalVisible] = useState(false)

    function onModalToggle() {
        setModalVisible(prev => !prev)
    }

    return (
        <View style={[styles.flex, styles.mainContainer]}>
            <TouchableOpacity style={styles.smallContainer}
                onPress={() => navigation.navigate('Notifications')}>
                <View style={[styles.flex]}>
                    <TextDefault bold H5 style={alignment.PLlarge}>
                        {'Notifications'}
                    </TextDefault>
                    <TextDefault light style={[alignment.PLlarge, alignment.MTxSmall]}>
                        {'Recommendations & speical communications'}
                    </TextDefault>
                </View>
                <Entypo name="chevron-small-right" size={scale(30)} color={colors.buttonbackground} />
            </TouchableOpacity>
            {/* <TouchableOpacity style={styles.smallContainer}
                onPress={() => navigation.navigate('Privacy')}>
                <View style={[styles.flex]}>
                    <TextDefault bold H5 style={alignment.PLlarge}>
                        {'Privacy'}
                    </TextDefault>
                    <TextDefault light style={[alignment.PLlarge, alignment.MTxSmall]}>
                        {'Phone number visibility'}
                    </TextDefault>
                </View>
                <Entypo name="chevron-small-right" size={scale(30)} color={colors.buttonbackground} />
            </TouchableOpacity>
            */}
            <TouchableOpacity style={styles.smallContainer}
                onPress={() => {
                    logout()
                    navigation.dispatch(StackActions.popToTop())
                }}>
                <TextDefault bold H5 style={[alignment.PLlarge, styles.flex]}>
                    {'Logout'}
                </TextDefault>
            </TouchableOpacity>
            {/* <TouchableOpacity style={styles.smallContainer}
                onPress={() => {
                    logout()
                    navigation.dispatch(StackActions.popToTop())
                }}
            >
                <TextDefault bold H5 style={[alignment.PLlarge, styles.flex]}>
                    {'Logout from all devices'}
                </TextDefault>
            </TouchableOpacity> */}
            {/* <TouchableOpacity style={styles.smallContainer}
                onPress={onModalToggle}>
                <TextDefault bold H5 style={[alignment.PLlarge, styles.flex]}>
                    {'Deactivate account and delete my data'}
                </TextDefault>
            </TouchableOpacity> */}

            <DeactivateModal
                modalVisible={modalVisible}
                onModalToggle={onModalToggle}
            />
        </View>
    )
}
export default React.memo(Settings)