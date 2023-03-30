import React from 'react'
import { View, StatusBar, TouchableOpacity  } from 'react-native'
import { FlashMessage } from '../../components'
import { TextDefault } from '../../components/Text'
import { useLocation } from '../../hooks'
import { useNavigation } from '@react-navigation/native'
import { useSafeArea } from 'react-native-safe-area-context'
import styles from './styles'
import LocationPermission from '../../assets/SVG/imageComponents/LocationPermission'
import { colors, scale } from '../../utilities'
function CurrentLocation() {
    const inset = useSafeArea()
    const navigation = useNavigation()
    const { getCurrentLocation, getLocationPermission } = useLocation()
    const setCurrentLocation = async () => {
        const { status, canAskAgain } = await getLocationPermission()
        if (status !== 'granted' && !canAskAgain) {
            FlashMessage({
                message:
                    'Tap on this message to open Settings then allow app to use location from permissions.',
                onPress: async () => {
                    await Linking.openSettings()
                }
            })
            return
        }
        const { error, coords, message } = await getCurrentLocation()
        if (error) {
            FlashMessage({
                message
            })
            return
        }
        navigation.navigate('SelectLocation', { ...coords })
    }
    StatusBar.setBarStyle('light-content')
    return (
        <>
            <View
                style={[
                    styles().flex,
                    {
                        backgroundColor: colors.selectedText,
                        paddingTop: inset.top
                    }
                ]}>
                <View style={[styles().flex, styles.screenBackground]}>
                    <View style={styles().subContainerImage}>
                        <View style={styles.imageContainer}>
                        <LocationPermission width={scale(300)} height={scale(300)} />
                        </View>
                        <View style={styles().descriptionEmpty}>
                            <TextDefault textColor={colors.themeBackground} bolder center>
                                {'Olo uses your location to show the products near you!'}
                            </TextDefault>
                        </View>
                        <TouchableOpacity
                            activeOpacity={0.7}
                            style={styles().emptyButton}
                            onPress={setCurrentLocation}>
                            <TextDefault
                                textColor={'#fff'}
                                bolder
                                center
                                uppercase>
                                {'use current location'}
                            </TextDefault>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        style={styles().linkButton}
                        onPress={() => {
                            navigation.navigate('SelectLocation')
                        }}>
                        <TextDefault
                            textColor={colors.white}
                            H5
                            bold
                            center>
                            {'Select another location'}
                        </TextDefault>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ paddingBottom: inset.bottom }} />
        </>
    )
}

export default CurrentLocation