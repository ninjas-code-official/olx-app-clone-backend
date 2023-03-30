import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react'
import { View, TouchableOpacity, FlatList, Image } from 'react-native';
import { EmptyButton, TextDefault } from '../../../../components';
import { alignment, colors, scale } from '../../../../utilities';
import styles from './styles';
import { SimpleLineIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { BorderlessButton, BaseButton, RectButton } from 'react-native-gesture-handler';

const FILTERS = [
    {
        value: 0,
        title: 'All'
    },
    {
        value: 1,
        title: 'Unread'
    },
    {
        value: 2,
        title: 'Important'
    }
]

const MESSAGES = [
    {
        id: 3,
        name: 'Fatim',
        lastMessage: "It's already sold.",
        duration: '4 days ago',
        adTile: '5 seater sofa set',
        addPic: require('../../../../assets/images/products/cycle.jpg'),
        imaga: require('../../../../assets/images/avatar.png')
    }
]


function ALL() {
    const navigation = useNavigation()
    const [filter, setFilter] = useState(FILTERS[0].value)
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
                    {"We'll keep messages for any item you're trying to buying in here"}
                </TextDefault>
                <EmptyButton
                    title='Explore the latest ads'
                    onPress={() => navigation.navigate('Main')}
                /> */}
                <TextDefault H2 center bold style={alignment.MTlarge}>
                    {"Chat feature will be available upon request! "}
                </TextDefault>
            </View>
        )
    }

    function header() {
        return (
            <View style={styles.filterContainer}>
                <TextDefault uppercase>
                    {'QUICK FILTERs'}
                </TextDefault>
                <View style={styles.filterRow}>
                    {FILTERS.map((item) => (
                        <TouchableOpacity key={item.value}
                            style={[styles.boxContainer, item.value === filter ? styles.selected : styles.notSelected]}
                            onPress={() => setFilter(item.value)}>
                            <TextDefault style={item.value === filter ? styles.selectedText : styles.unSelectedText}>
                                {item.title}
                            </TextDefault>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        )
    }

    return (
        <View style={[styles.flex, styles.mainContainer]}>
            {/* {emptyView()} */}
            <FlatList
                data={[]}
                style={styles.flex}
                contentContainerStyle={{ flexGrow: 1, backgroundColor: colors.themeBackground }}
                ListHeaderComponent={MESSAGES.length > 0 && header}
                ListEmptyComponent={emptyView}
                ItemSeparatorComponent={() => <View style={styles.seperator} />}
                stickyHeaderIndices={[0]}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <RectButton
                        activeOpacity={0.07}
                        style={styles.messageContainer}
                        onPress={() => navigation.navigate('LiveChat')}>
                        <View style={styles.imgResposive}>
                            <Image
                                style={styles.image}
                                source={item.addPic}
                                defaultSource={require('../../../../assets/images/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png')}
                            />
                            <Image
                                style={styles.profileImg}
                                source={item.imaga}
                                defaultSource={require('../../../../assets/images/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png')}
                            />
                        </View>
                        <View style={styles.infoContainer}>
                            <View style={styles.infoBox}>
                                <View style={styles.messageIcon}>
                                    <TextDefault H5 bold style={[styles.flex, alignment.MBxSmall]}>
                                        {item.name}
                                    </TextDefault>
                                    <TextDefault light>
                                        {item.duration}
                                    </TextDefault>
                                </View>
                                <View style={styles.messageIcon}>
                                    <TextDefault numberOfLines={1} light style={[styles.flex, alignment.MRxSmall]}>
                                        {item.adTile}
                                    </TextDefault>
                                    <MaterialCommunityIcons name="dots-vertical" size={scale(20)} color="black" />
                                </View>
                                <View style={styles.messageIcon}>
                                    <SimpleLineIcons name="envelope" size={scale(15)} color={colors.fontSecondColor} />
                                    <TextDefault numberOfLines={1} textColor={colors.fontSecondColor} style={[alignment.MLxSmall, styles.flex]}>
                                        {item.lastMessage}
                                    </TextDefault>
                                </View>
                            </View>
                            <View style={styles.line} />
                        </View>

                    </RectButton>
                )}
            />
        </View>
    )
}

export default React.memo(ALL)