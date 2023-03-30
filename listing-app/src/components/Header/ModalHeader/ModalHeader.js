import React from 'react'
import { StyleSheet, View } from 'react-native'
import { colors } from '../../../utilities'
import { TextDefault } from '../../Text'
import { LeftButton } from '../HeaderIcons/HeaderIcons'
import styles from './styles'

function ModalHeader(props) {
    return (
        <View style={[styles.headerContainer, { borderBottomWidth: props.title ? StyleSheet.hairlineWidth : 0 }]}>
            <View style={styles.headerContents}>
                <LeftButton icon='close' iconColor={colors.headerText} navigate={props.closeModal} />
                {props.title &&
                    <TextDefault textColor={colors.headerText} style={styles.title} bolder H3>
                        {props.title}
                    </TextDefault>
                }
            </View>
        </View>
    )
}
export default React.memo(ModalHeader)