import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { Switch, View } from 'react-native'
import { TextDefault } from '../../../components'
import { alignment, colors } from '../../../utilities'
import styles from './styles'

function Privacy() {
    const navigation = useNavigation()
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(prev => !prev);
    return (
        <View style={[styles.flex, styles.mainContainer]}>
            <View style={styles.smallContainer}>
                <TextDefault bold H5 style={[alignment.PLlarge, styles.flex]}>
                    {'Show my phone number in ads'}
                </TextDefault>
                <Switch
                    trackColor={{ false: colors.headerbackground, true: colors.buttonbackground }}
                    thumbColor={colors.containerBox}
                    ios_backgroundColor={colors.headerbackground}
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
            </View>
        </View>
    )
}
export default React.memo(Privacy)