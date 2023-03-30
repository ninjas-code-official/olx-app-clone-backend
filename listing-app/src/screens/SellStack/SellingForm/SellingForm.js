import { gql, useQuery } from '@apollo/client';
import { Entypo } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { zones } from '../../../apollo/server';
import { EmptyButton, Spinner, TextDefault, TextError } from '../../../components';
import ZoneModal from '../../../components/Modal/ZoneModal/ZoneModal';
import { alignment, colors, scale } from '../../../utilities';
import styles from './styles';
const GET_ZONES = gql`${zones}`
const CONDITIONS = [
    {
        value: 'new',
        title: 'New'
    },
    {
        value: 'used',
        title: 'Used'
    },
]

const items = [
    { label: 'Item 1', value: 'item1' },
    { label: 'Item 2', value: 'item2' },
]

function SellingForm() {
    const navigation = useNavigation()
    const route = useRoute()
    const editProduct = route?.params?.editProduct ?? null
    const [margin, marginSetter] = useState(false)
    const [condition, setCondition] = useState(null)
    const [adColor, setAdColor] = useState(colors.fontMainColor)
    const [descriptionColor, setDescriptionColor] = useState(colors.fontMainColor)
    const [locationColor, setLocationColor] = useState(colors.fontMainColor)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [location, setLocation] = useState('');
    const [locationError, setLocationError] = useState(null)
    const [titleError, setTitleError] = useState(null)
    const [conditionError, setConditionError] = useState(null)
    const [descriptionError, setDescriptionError] = useState(null)
    const [editStatus, setEditStatus] = useState(false)
    const [id, setId] = useState('')
    const [price, setPrice] = useState('')
    const [image, setImage] = useState('')
    const [modalVisible, setModalVisible] = useState(false);
    const [subCategory, setSubCategory] = useState(route?.params?.subCategory ?? null)
    const { error, loading, data } = useQuery(GET_ZONES)

    useEffect(() => {
        if (!!editProduct) {
            didFocus()
        }
    }, [])

    async function didFocus() {
        setTitle(editProduct.title)
        setDescription(editProduct.description)
        setLocation({ value: editProduct.zone._id, label: editProduct.zone.title })
        setCondition(editProduct.condition)
        setSubCategory(editProduct.subCategory._id)
        setId(editProduct._id)
        setPrice(editProduct.price)
        setImage(editProduct.images[0])
        setEditStatus(true)
    }

    useEffect(() => {
        Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
        Keyboard.addListener("keyboardDidHide", _keyboardDidHide);

        // cleanup function
        return () => {
            Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
            Keyboard.removeListener("keyboardDidHide", _keyboardDidHide);
        };
    }, []);

    useEffect(() => {
        (async () => {
            await AsyncStorage.setItem('formData', null)
        })
    }, [])

    function _keyboardDidShow() {
        marginSetter(true)
    }
    function _keyboardDidHide() {
        marginSetter(false)
    }

    function toggleModal() {
        setModalVisible(prev => !prev)
    }


    function onChange(setter, errorSetter, value) {
        setter(value)
        errorSetter(null)
    }

    function validate() {
        let result = true
        if (title.length < 1) {
            setTitleError('This is mandatory. Please complete the required field.')
            result = false
        }
        if (description.length < 1) {
            setDescriptionError('This is mandatory. Please complete the required field.')
            result = false
        }
        if (condition === null) {
            setConditionError('This is mandatory. Please complete the required field.')
            result = false
        }
        if (location === '') {
            setLocationError('This is mandatory. Please complete the required field.')
            result = false
        }
        return result
    }

    if (loading) {
        return <Spinner spinnerColor={colors.spinnerColor1} backColor={'transparent'} />
    }

    if (error) {
        return <TextError text={error.message} />
    }
    let zone = null
    if (data) {
        zone = []
    }

    return (
        <SafeAreaView edges={['bottom']} style={[styles.flex, styles.safeAreaview]}>
            <KeyboardAvoidingView style={[styles.flex, styles.mainContainer]}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                contentContainerStyle={{ flexGrow: 1 }}>
                <ScrollView
                    keyboardShouldPersistTaps='handled'
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ flexGrow: 1, paddingBottom: margin ? scale(75) : 0 }}
                    style={[styles.flex, styles.mainContainer]}>
                    <View style={[styles.flex, { justifyContent: "space-between" }]}>
                        <View>
                            <View style={[styles.width100, styles.subContainer]}>
                                <TextDefault textColor={conditionError ? colors.google : colors.fontMainColor} H5 bold style={styles.width100}>
                                    {'Condition *'}
                                </TextDefault>
                                <View style={styles.subContainerRow}>
                                    {CONDITIONS.map((item, index) => (
                                        <TouchableOpacity key={item.value}
                                            style={[styles.conditionBox, styles.boxContainer, item.value === condition ? styles.selected : styles.notSelected]}
                                            onPress={() => onChange(setCondition, setConditionError, item.value)}>
                                            <TextDefault style={item.value === condition ? styles.selectedText : styles.unSelectedText}>
                                                {item.title}
                                            </TextDefault>
                                        </TouchableOpacity>
                                    ))
                                    }
                                </View>
                                {conditionError &&
                                    <TextDefault textColor={colors.google} style={styles.width100}>
                                        {conditionError}
                                    </TextDefault>
                                }
                            </View>
                            <View style={styles.line} />
                            <View style={styles.subContainer}>
                                <TextDefault textColor={titleError ? colors.google : adColor} H5 bold style={styles.width100}>
                                    {'Ad title *'}
                                </TextDefault>
                                <View style={[styles.textContainer, { borderColor: adColor }]}>
                                    <TextInput
                                        style={styles.inputText}
                                        maxLength={70}
                                        onFocus={() => {
                                            setTitleError(null)
                                            setAdColor(colors.selectedText)
                                        }}
                                        defaultValue={title}
                                        onBlur={() => setAdColor(colors.fontMainColor)}
                                        onChangeText={text => setTitle(text)}
                                        placeholderTextColor={colors.fontSecondColor}
                                        placeholder={'Key Features of your item '}
                                    />
                                </View>
                                <TextDefault light small right style={alignment.MTxSmall}>
                                    {title.length + '/ 70'}
                                </TextDefault>
                                {titleError &&
                                    <TextDefault textColor={colors.google} style={styles.width100}>
                                        {titleError}
                                    </TextDefault>
                                }
                            </View>
                            <View style={styles.line} />
                            <View style={styles.subContainer}>
                                <TextDefault textColor={descriptionError ? colors.google : descriptionColor} H5 bold style={styles.width100}>
                                    {'Additional information *'}
                                </TextDefault>
                                <View style={[styles.descriptionContainer, { borderColor: descriptionColor }]}>
                                    <TextInput
                                        style={styles.inputText}
                                        maxLength={4096}
                                        multiline={true}
                                        defaultValue={description}
                                        onFocus={() => {
                                            setDescriptionError(null)
                                            setDescriptionColor(colors.selectedText)
                                        }}
                                        onBlur={() => setDescriptionColor(colors.fontMainColor)}
                                        onChangeText={text => setDescription(text)}
                                        placeholderTextColor={colors.fontSecondColor}
                                        placeholder={'Include condition, features and reasons for selling '}
                                    />
                                </View>
                                <TextDefault light small right style={alignment.MTxSmall}>
                                    {description.length + '/ 4096'}
                                </TextDefault>
                                {descriptionError &&
                                    <TextDefault textColor={colors.google} style={styles.width100}>
                                        {descriptionError}
                                    </TextDefault>
                                }
                            </View>
                            <View style={styles.line} />
                            <View style={styles.locationContainer}>
                                <TextDefault textColor={locationError ? colors.google : locationColor} H5 bold style={styles.width100}>
                                    {'Location *'}
                                </TextDefault>
                                <TouchableOpacity style={styles.inputConainer} onPress={toggleModal}>
                                    <TextDefault
                                        style={styles.flex}
                                    >
                                        {!!location ? location.label : 'Select Location'}</TextDefault>
                                    <Entypo name="chevron-down" size={scale(15)} color={colors.fontMainColor} />
                                </TouchableOpacity>
                                {locationError &&
                                    <TextDefault textColor={colors.google} style={styles.width100}>
                                        {locationError}
                                    </TextDefault>
                                }
                            </View>
                        </View>
                        <View style={styles.buttonView}>
                            <EmptyButton
                                title='Next'
                                onPress={async () => {
                                    if (validate() && subCategory) {
                                        //console.log('selling form', {id, location, description, title, condition, subCategory, editStatus, price})
                                        await AsyncStorage.setItem('formData', JSON.stringify({ id, location, description, title, condition, subCategory, editStatus, price, image }))
                                        navigation.navigate('UploadImage')
                                    }
                                }} />
                        </View>
                    </View>
                </ScrollView>
                <ZoneModal visible={modalVisible} setZone={setLocation} location={location} onModalToggle={toggleModal} />
            </KeyboardAvoidingView >
        </SafeAreaView >
    )
}
export default React.memo(SellingForm)