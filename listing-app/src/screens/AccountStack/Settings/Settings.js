import React, { useContext, useState, useRef } from 'react'
import { View, TouchableOpacity, Modal } from 'react-native'
import styles from './styles'
import { DeactivateModal, TextDefault } from '../../../components'
import { alignment, colors, scale } from '../../../utilities'
import { Entypo } from '@expo/vector-icons'
import { gql, useMutation } from "@apollo/client";
import { StackActions, useNavigation } from '@react-navigation/native'
import UserContext from '../../../context/user'
import {Deactivate} from '../../../apollo/server'
import { Modalize } from 'react-native-modalize'


const DEACTIVATE = gql`
  ${Deactivate}
`

function Settings() {
    const navigation = useNavigation()
    const { logout,profile } = useContext(UserContext)
    const [deactivated] = useMutation(DEACTIVATE)
    const [modalVisible, setModalVisible] = useState(false)
    const modalizeRef = useRef(null)

    function onModalToggle() {
        setModalVisible(prev => !prev)
    }
    const onClose = () => {
        modalizeRef.current.close()
      }
    async function deactivatewithemail() {
        deactivated({ variables: { isActive: false, email: profile.email } })
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
            <TouchableOpacity style={styles.smallContainer}
                onPress={async() => {
                    modalizeRef.current.open('top')
                }}>
                <TextDefault bold H5 style={{color: "red", paddingLeft: 20 }}>
                    {'Deactivate'}
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
            <Modalize
        ref={modalizeRef}
        adjustToContentHeight
        handlePosition="inside"
        avoidKeyboardLikeIOS={Platform.select({
          ios: true,
          android: true
        })}
        keyboardAvoidingOffset={2}
        keyboardAvoidingBehavior="height">
        <View style={{ flex: 1, alignItems: 'center' }}>
          <TextDefault bolder H5 style={{ marginTop: 20 }}>
            Are you Sure you want to Delete Your Account?
          </TextDefault>
          <TouchableOpacity
            activeOpacity={0.7}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: "red",
              borderRadius: 10,
              width: '70%',
              padding: 15,
              ...alignment.MTlarge
            }}
            onPress={async () => {
              await deactivatewithemail()
              logout()
              navigation.dispatch(StackActions.popToTop())
            }}>
            <TextDefault center bold style={{color: "white"}}>
              Delete Account
            </TextDefault>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            style={{ width: '100%', paddingTop: 30, paddingBottom: 20 }}
            onPress={() => onClose()}>
            <TextDefault center>Cancel</TextDefault>
          </TouchableOpacity>
        </View>
      </Modalize>
        </View>
    )
}
export default React.memo(Settings)