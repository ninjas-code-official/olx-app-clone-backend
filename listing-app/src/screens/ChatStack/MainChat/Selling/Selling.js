import React from 'react'
import { Image, TouchableOpacity, View } from 'react-native';
import { EmptyButton, TextDefault } from '../../../../components';
import { alignment, colors } from '../../../../utilities';
import styles from './styles';

function Selling() {
    function emptyView() {
        return (
            <View style={[styles.flex, styles.emptyContainer]}>
                {/* <Image
                    style={styles.emptyImage}
                    source={require('../../../../assets/images/emptyView/email.png')}
                />
                <TextDefault H4 center bold style={alignment.MTlarge}>
                    {"No messages, yet?"}
                </TextDefault>
                <TextDefault H5 center light style={alignment.MTsmall}>
                    {"We'll keep messages for any item you're selling in here"}
                </TextDefault>

                <EmptyButton
                    title='Start selling'
                /> */}
                <TextDefault H2 center bold style={alignment.MTlarge}>
                    {"Chat feature will be available upon request!"}
                </TextDefault>
            </View>
        )
    }

    return (
        <View style={[styles.flex, styles.mainContainer]}>
            {emptyView()}
        </View>
    )
}

export default React.memo(Selling)