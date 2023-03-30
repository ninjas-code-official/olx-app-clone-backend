import { Feather, FontAwesome, MaterialIcons, Octicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { BorderlessButton } from 'react-native-gesture-handler'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { colors, scale } from '../../../utilities'
import { TextDefault } from '../../Text'
import styles from './styles'

function MainHeader(props) {
    const inset = useSafeAreaInsets()
    const navigation = useNavigation()
    return (
        <View style={[styles.headerBackground, { paddingTop: inset.top }]} >
            <TouchableOpacity
                activeOpacity={1}
                onPress={() => props.onModalToggle()}
                style={styles.row}>
                <MaterialIcons name='location-on' size={scale(25)} color={colors.headerText} />
                <TextDefault numberOfLines={1} textColor={colors.headerText} H5 style={styles.title}>
                    {props.locationText}
                </TextDefault>
                <Feather name='chevron-down' size={scale(20)} color={colors.fontSecondColor} />
            </TouchableOpacity>
            <View style={styles.searchContainer}>
                <TouchableOpacity
                    onPress={() => props.toggleSearch()}
                    activeOpacity={1}
                    style={styles.inputConainer}>
                    <Octicons name='search' size={scale(18)} color={colors.headerText} />
                    <TextDefault
                        textColor={colors.fontSecondColor}
                        style={styles.searchBar}
                        value
                        light
                    >
                        {props.search ? props.search : 'Find Cars, Mobile Phone and more...'}
                    </TextDefault>
                </TouchableOpacity>
                <BorderlessButton style={styles.bellBtn}
                    onPress={() => navigation.navigate('Notifications')}>
                    <FontAwesome name="bell-o" size={scale(18)} color={colors.headerText} />
                </BorderlessButton>
            </View>
        </View>
    )

}
export default React.memo(MainHeader)