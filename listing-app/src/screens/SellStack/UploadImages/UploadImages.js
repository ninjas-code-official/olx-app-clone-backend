import { SimpleLineIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as Device from 'expo-device';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import React, { useEffect, useState } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { EmptyButton, FlashMessage, TextDefault } from '../../../components';
import { colors, scale } from '../../../utilities';
import styles from './styles';

function UploadImages() {
    const navigation = useNavigation()
    const route = useRoute()
    const [image, setImage] = useState(null)
    const [newImage, setNewImage] = useState(false)
    const [formData, setFormData] = useState(null)
    useEffect(() => {
        navigation.setOptions({
            title: 'Upload your photos'
        })
    }, [])

    useEffect(() => {
        didFocus()
    }, [])

    async function didFocus() {
        const formStr = await AsyncStorage.getItem('formData')
        const formObj = JSON.parse(formStr)
        setFormData(formObj)
        console.log(formObj);
        setImage(formObj.image??nul)
    }

    async function PickImage() {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
            base64: true
        })
        if (!result.canceled) {
            setNewImage(true)
            setImage(`data:image/jpg;base64,${result.assets}`)
        }

    }

    async function CaptureImage() {
        if (!Device.isDevice) {
            FlashMessage({
                message: 'Camers is not working on simulator!',
                type: 'warning'
            })
            return
        }

        const { status: checkStatus } = await Permissions.getAsync(Permissions.CAMERA)
        if (checkStatus !== 'granted') {
            const { status: CameraStatus } = await Permissions.askAsync(Permissions.CAMERA);
            if (CameraStatus !== 'granted') {
                alert('Sorry, we need camera permission to make this work!')
                return
            }
        }
        const { status: checkStatusRoll } = await Permissions.getAsync(Permissions.MEDIA_LIBRARY)
        if (checkStatusRoll !== 'granted') {
            const { status: CameraRollStatus } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY)
            if (CameraRollStatus !== 'granted') {
                alert('Sorry, we need camera roll permission to make this work!')
                return
            }
        }

        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
            base64: true
        })
        if (!result.canceled) {
            setNewImage(true)
            setImage(`data:image/jpg;base64,${result.assets}`)
        }
    }
    return (
        <SafeAreaView edges={['bottom']} style={[styles.flex, styles.safeAreaview]}>
            <View style={[styles.flex, styles.mainContainer]}>
                <View style={styles.imgContainer}>
                    <View style={styles.imgResponsive}>
                        <Image style={styles.img}
                            source={require('../../../assets/images/emptyView/photo-album.png')} />
                    </View>
                    <TextDefault H5 center>
                        {'Uploading more photos increases your chance of closing a deal'}
                    </TextDefault>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity activeOpacity={0.7} style={styles.iconBtn} onPress={CaptureImage}>
                            <SimpleLineIcons name='camera' size={scale(35)} color={colors.buttonText} />
                            <TextDefault textColor={colors.buttonText} bold uppercase>
                                {'Take a picture'}
                            </TextDefault>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.7} style={styles.iconBtn} onPress={PickImage}>
                            <SimpleLineIcons name='folder-alt' size={scale(35)} color={colors.buttonText} />
                            <TextDefault textColor={colors.buttonText} bold uppercase>
                                {'Folders'}
                            </TextDefault>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.buttonView}>
                    <EmptyButton
                        disabled={!image}
                        title='Next'
                        onPress={async () => {
                            await AsyncStorage.setItem('formData', JSON.stringify({ ...formData, image, newImage }))
                            navigation.navigate('Price')
                        }} />
                </View>
            </View>
        </SafeAreaView>
    )
}
export default React.memo(UploadImages)