import React from 'react'
import { View, Image, TouchableOpacity } from 'react-native'
import { colors, scale } from '../../../utilities'
import { TextDefault } from '../../Text'
import styles from './styles'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'

function ImageHeader() {
    const navigation = useNavigation()
    return (
        <View style={styles.headerContainer}>
            <View style={styles.imgResponsive}>
                <Image
                    style={styles.image}
                    source={require('../../../assets/images/emptyView/price-tag.png')} />
            </View>
            <TextDefault bold H5>
                {'Heavy Discount on Packages'}
            </TextDefault>

            <TouchableOpacity activeOpacity={1}
                style={styles.backButton}
                onPress={() => navigation.goBack()}>
                <Ionicons
                    name="ios-arrow-back"
                    size={scale(30)}
                    color={colors.headerText}
                />
            </TouchableOpacity>
        </View>
    )
}

export default React.memo(ImageHeader)