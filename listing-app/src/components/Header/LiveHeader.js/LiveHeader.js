import { Feather, MaterialCommunityIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import * as Device from 'expo-device'
import React, { useState } from 'react'
import { Dimensions, FlatList, Image, Linking, Modal, Platform, TouchableOpacity, View } from 'react-native'
import { BorderlessButton } from 'react-native-gesture-handler'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { alignment, colors, scale } from '../../../utilities'
import { FlashMessage } from '../../FlashMessage/FlashMessage'
import { TextDefault } from '../../Text'
import { LeftButton } from '../HeaderIcons/HeaderIcons'
import styles from './styles'

const { width, height } = Dimensions.get('window')

const OPTIONS = ['Delete Chat', 'Report User', 'Block User', 'Safety Tips', 'Turn Off SafetyTips']

function ModalHeader() {
    const navigation = useNavigation()
    const [open, setOpen] = useState(false)
    const inset = useSafeAreaInsets()

    function dialCall() {
        if (!Device.isDevice)
            FlashMessage({ message: 'This function is not working on Simulator/Emulator', type: 'warning' })
        else {
            let phoneNumber = '';
            if (Platform.OS === 'android') {
                phoneNumber = 'tel:${1234567890}';
            }
            else {
                phoneNumber = 'telprompt:${1234567890}';
            }

            Linking.openURL(phoneNumber);
        }
    };

    function Sms() {
        let url = `sms:1234567890${Platform.OS === "ios" ? "&" : "?"}body=${"This is sample text"}`

        Linking.openURL(url);
    };

    function customMessage() {
        FlashMessage({ message: 'Pending Features' })
        setOpen(false)
        // navigation.goBack()
    }
    return (
        <SafeAreaView edges={['top']} style={styles.safeAreaContainer}>
            <View style={styles.headerContainer}>
                <View style={styles.headerContents}>
                    <LeftButton icon='back' iconColor={colors.headerText} />
                    <View style={[styles.flex, styles.titleContainer]}>
                        <View style={styles.imageResponsive}>
                            <Image
                                style={[styles.flex, styles.img]}
                                source={require('../../../assets/images/products/cycle.jpg')} />
                            <Image
                                style={styles.profileImg}
                                source={require('../../../assets/images/avatar.png')}
                            />
                        </View>
                        <View style={styles.infoContainer}>
                            <TextDefault bold H5>
                                {'Fatim'}
                            </TextDefault>
                            <TextDefault textColor={colors.fontSecondColor} small>
                                {'Online'}
                            </TextDefault>
                        </View>
                        <View style={styles.iconContainer}>
                            <BorderlessButton
                                style={alignment.PxSmall}
                                borderless={false}
                                onPress={dialCall}>
                                <View accessible>
                                    <Feather name="phone" size={scale(20)} color={colors.headerText} />
                                </View>
                            </BorderlessButton>
                            <BorderlessButton
                                style={alignment.PxSmall}
                                borderless={false}
                                onPress={Sms}>
                                <MaterialCommunityIcons name="message-text-outline" size={scale(20)} color={colors.headerText} />
                            </BorderlessButton>
                            <BorderlessButton
                                onPress={() => setOpen(true)}
                                style={alignment.PxSmall}
                                borderless={false}>
                                <MaterialCommunityIcons name="dots-vertical" size={scale(20)} color={colors.headerText} />
                            </BorderlessButton>
                        </View>
                    </View>
                    {open &&
                        <Modal
                            animationType="fade"
                            transparent={true}
                            visible={open}
                            onRequestClose={() => setOpen(false)}
                        >
                            <TouchableOpacity activeOpacity={1} style={styles.flex} onPress={() => setOpen(false)} >
                                <FlatList
                                    data={OPTIONS}
                                    style={{ width: width * 0.5, backgroundColor: colors.containerBox, position: 'absolute', top: inset.top, right: scale(5) }}
                                    keyExtractor={(index) => index.toString()}
                                    renderItem={({ item, index }) => (
                                        <BorderlessButton
                                            onPress={customMessage}
                                            borderless={false}
                                            style={{ ...alignment.Pmedium }}>
                                            <TextDefault bold H5>
                                                {item}
                                            </TextDefault>
                                        </BorderlessButton>
                                    )}
                                />
                            </TouchableOpacity>
                        </Modal>
                    }
                </View>
            </View>
        </SafeAreaView >
    )

}
export default React.memo(ModalHeader)