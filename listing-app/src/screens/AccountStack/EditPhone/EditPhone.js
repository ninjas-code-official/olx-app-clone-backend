import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useLayoutEffect, useState } from 'react'
import {
    Image, Switch, TextInput, View, KeyboardAvoidingView, Keyboard, TouchableOpacity
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import CountryPicker from 'react-native-country-picker-modal';
import { EmptyButton, FlashMessage, TextDefault } from '../../../components'
import UserContext from '../../../context/user';
import { alignment, colors,  textStyles } from '../../../utilities'
import styles from './styles'


function EditPhone() {
    const navigation = useNavigation()
    const route = useRoute()
    const phoneData = route.params && route.params.phoneData
        ? route.params.phoneData
        : null
    const [phone, setPhone] = useState(phoneData ? phoneData.number : '')
    const [phoneError, setPhoneError] = useState(null)
    const [focus, setFocus] = useState(false)
    const [isEnabled, setIsEnabled] = useState(phoneData ? !!phoneData.showPhone : false);
    const toggleSwitch = () => setIsEnabled(prev => !prev);
    const [adColor, setAdColor] = useState(colors.fontThirdColor)
    const [countryCode, setCountryCode] = useState(phoneData ? phoneData.countryCode : 'PK')
    const [callingCode, setCallingCode] = useState(phoneData ? phoneData.callingCode : '92')
    useLayoutEffect(() => {
        navigation.setOptions({
            title: null
        })
    }, [navigation])

    function validate() {
        let result = true
        if (!(phone.length >= 9 && phone.length <= 13)) {
            setPhoneError('Phone Number must be between 9-13')
            result = false
        }
        else if (!callingCode || !callingCode) {
            FlashMessage({ message: 'Country is missing' })
            result = false
        }
        return result
    }



    return (
        <SafeAreaView edges={['bottom']} style={[styles.flex, styles.safeAreaView]}>
            <KeyboardAvoidingView contentContainerStyle={alignment.PBlarge} style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <TouchableOpacity activeOpacity={1}
                    style={[styles.flex, styles.mainContainer]}
                    onPress={() => Keyboard.dismiss()}>
                    {/* <ModalHeader closeModal={() => navigation.goBack()} /> */}
                    <View style={[styles.flex, styles.basicInfoContainer]}>
                        <View style={styles.imageContainer}>
                            <Image
                                style={styles.imgResponsive}
                                source={require('../../../assets/images/avatar.png')}
                                resizeMode='cover'
                            />
                        </View>
                        <TextDefault textColor={colors.fontMainColor} bold H4 style={[alignment.MTlarge, alignment.PLsmall]}>
                            {'Verify your phone'}
                        </TextDefault>
                        <TextDefault textColor={colors.fontSecondColor} style={[alignment.MTsmall, alignment.PLsmall]}>
                            {'We will send a confirmation code to your phone'}
                        </TextDefault>
                        <View style={styles.phoneRow}>
                            <View style={styles.countryBox}>
                                <CountryPicker
                                    containerButtonStyle={[alignment.PTsmall, alignment.PBxSmall]}
                                    countryCode={countryCode}
                                    withCallingCode
                                    withAlphaFilter
                                    withFilter
                                    withCallingCodeButton
                                    onSelect={(value) => {
                                        setCountryCode(value.cca2)
                                        setCallingCode(value.callingCode[0])
                                    }}
                                    cca2={countryCode}
                                    translation='eng'

                                />
                            </View>
                            <View style={[styles.numberBox, { borderColor: adColor }]}>
                                <TextDefault textColor={phoneError ? colors.errorColor : adColor}>
                                    {(focus || phone.length > 0) ? 'Phone Number' : ''}
                                </TextDefault>
                                <TextInput
                                    style={[styles.flex, alignment.PBxSmall, textStyles.H5]}
                                    placeholder={focus ? '' : 'Phone Number'}
                                    placeholderTextColor={colors.fontThirdColor}
                                    maxLength={13}
                                    value={phone}
                                    keyboardType={'phone-pad'}
                                    onFocus={() => {
                                        setPhoneError(null)
                                        setFocus(true)
                                        setAdColor(colors.selectedText)
                                    }}
                                    onBlur={() => {
                                        setFocus(false)
                                        setAdColor(colors.fontThirdColor)
                                    }}
                                    onChangeText={text => setPhone(text)}
                                />
                            </View>
                        </View>
                        {phoneError &&
                            <TextDefault textColor={colors.google} style={styles.error}>
                                {phoneError}
                            </TextDefault>
                        }
                        <View style={styles.smallContainer}>
                            <TextDefault H5 bold style={styles.flex}>
                                {`Show my phone number in ads`}
                            </TextDefault>
                            <Switch
                                trackColor={{ false: colors.headerbackground, true: colors.buttonbackground }}
                                thumbColor={colors.containerBox}
                                ios_backgroundColor={colors.headerbackground}
                                onValueChange={toggleSwitch}
                                value={isEnabled}
                            />
                        </View>
                    </View >
                    <View style={styles.buttonView}>
                        <EmptyButton
                            disabled={phone.length < 1}
                            title='Save'
                            onPress={() => {
                                if (validate()) {
                                    navigation.navigate('EditProfile', {
                                        phoneData: {
                                            number: phone,
                                            callingCode: callingCode,
                                            countryCode: countryCode,
                                            showPhone: isEnabled
                                        }
                                    })
                                }
                            }
                            } />
                    </View>
                </TouchableOpacity >
            </KeyboardAvoidingView>
        </SafeAreaView >
    )
}

export default React.memo(EditPhone)