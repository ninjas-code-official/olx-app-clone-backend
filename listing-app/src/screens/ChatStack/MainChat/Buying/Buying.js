import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { Image, View, TouchableOpacity } from 'react-native';
import { EmptyButton, TextDefault } from '../../../../components';
import { alignment, colors } from '../../../../utilities';
import styles from './styles';

function Buying() {
    const navigation = useNavigation()
    function emptyView() {
        return (
            <View style={[styles.flex, styles.emptyContainer]}>
                {/* <Image
                    style={styles.emptyImage}
                    source={require('../../../../assets/images/emptyView/email.png')}
                />
                <TextDefault H4 center bold style={alignment.MTlarge}>
                    {"You are not buying anything yet."}
                </TextDefault>
                <TextDefault H5 center light style={alignment.MTsmall}>
                    {'Explore the products/items to deal with seller.'}
                </TextDefault>
                <EmptyButton
                    title='Explore'
                    onPress={() => navigation.navigate('Main')}
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

export default React.memo(Buying)