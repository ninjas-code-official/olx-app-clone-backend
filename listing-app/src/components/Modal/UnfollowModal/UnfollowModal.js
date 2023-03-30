import React from 'react'
import { Modal, View, TouchableOpacity } from 'react-native'
import { alignment } from '../../../utilities'
import { TextDefault } from '../../Text'
import styles from './styles'

function UnfollowModal(props) {
    function CallOk() {
        props.unFollow()
        props.onModalToggle()
    }
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={props.modalVisible}
        >
            <TouchableOpacity activeOpacity={1} onPress={props.onModalToggle} style={styles.centeredView}>
                <View style={styles.modalView}>
                    <TextDefault bolder H5 style={{ width: '100%' }}>
                        {`Do you want to unfollow ${props.name}`}
                    </TextDefault>
                    <TextDefault style={[alignment.MTmedium, { width: '100%' }]}>
                        {'You will have to find this user again'}
                    </TextDefault>
                    <View style={styles.buttonsRow}>
                        <TouchableOpacity style={styles.button} onPress={props.onModalToggle}>
                            <View style={styles.buttonText}>
                                <TextDefault bold H5>
                                    {'Cancel'}
                                </TextDefault>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => CallOk()}>
                            <View style={styles.buttonText}>
                                <TextDefault bold H5>
                                    {'Unfollow'}
                                </TextDefault>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
        </Modal>
    )
}

export default React.memo(UnfollowModal)