import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { EmptyButton, TextDefault } from '../../../components';
import ConfigurationContext from '../../../context/configuration';
import { colors, scale, textStyles } from '../../../utilities';
import styles from './styles';

function Price() {
    const navigation = useNavigation()
    const route = useRoute()
    const [margin, marginSetter] = useState(false)
    const [price, setPrice] = useState('')
    const [focus, setFocus] = useState(false)
    const [adColor, setAdColor] = useState(colors.fontPlaceholder)
    const [formData, setFormData] = useState(null)
    const configuration = useContext(ConfigurationContext)

    useEffect(() => {
        navigation.setOptions({
            title: 'Set a price'
        })
    }, [])

    useEffect(() => {
        didFocus()
    }, [])

    async function didFocus() {
        console.log('here');
        const formStr = await AsyncStorage.getItem('formData')
        const formObj = JSON.parse(formStr)
        setFormData(formObj)
        console.log(formObj);
        setPrice(formObj.price)
    }

    useEffect(() => {
        Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
        Keyboard.addListener("keyboardDidHide", _keyboardDidHide);

        // cleanup function
        return () => {
            Keyboard.removeAllListeners("keyboardDidShow", _keyboardDidShow);
            Keyboard.removeAllListeners("keyboardDidHide", _keyboardDidHide);
        };
    }, []);
    function _keyboardDidShow() {
        marginSetter(true)
    }
    function _keyboardDidHide() {
        marginSetter(false)
    }
    return (
        <SafeAreaView edges={['bottom']} style={[styles.flex, styles.safeAreaview]}>
            <KeyboardAvoidingView style={[styles.flex]}
                behavior={Platform.OS === 'ios' ? 'padding' : null}
            >
                <TouchableOpacity activeOpacity={1} onPress={Keyboard.dismiss} style={[styles.flex, styles.mainContainer, { paddingBottom: Platform.OS === 'ios' ? margin ? scale(100) : 0 : 0 }]}>
                    <View style={styles.flex}>
                        <View style={[styles.inputBorder, { borderBottomColor: adColor }]}>
                            <View style={styles.leftText}>
                                <TextDefault textColor={colors.fontSecondColor} H5 >
                                    {configuration.currency ?? 'RS'}
                                </TextDefault>
                            </View>
                            <TextInput style={[styles.flex, { ...textStyles.H4 }]}
                                textAlignVertical='center'
                                placeholder={focus ? '' : 'Price'}
                                placeholderTextColor={colors.fontThirdColor}
                                defaultValue={price.toString()}
                                keyboardType={'phone-pad'}
                                onFocus={() => {
                                    setFocus(true)
                                    setAdColor(colors.selectedText)
                                }}
                                onBlur={() => {
                                    setFocus(false)
                                    setAdColor(colors.fontThirdColor)
                                }}
                                onChangeText={text => setPrice(text)}
                            />
                        </View>
                    </View>
                    <View style={styles.buttonView}>
                        <EmptyButton
                            disabled={!price}
                            title='Next'
                            onPress={async () => {
                                if (!!price) {
                                    console.log(formData);
                                    await AsyncStorage.setItem('formData', JSON.stringify({ ...formData, price }))
                                    navigation.navigate('LocationConfirm')
                                }
                            }} />
                    </View>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}
export default React.memo(Price) 