import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useLayoutEffect } from 'react';
import { FlatList, TouchableOpacity, View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextDefault } from '../../../components';
import { alignment, colors, scale } from '../../../utilities';
import styles from './styles';


// const category = [
//     { id: '0', title: 'Mobiles', image: require('../../../assets/icons/categoryIcon/mobile.png') },
//     { id: '1', title: 'Vehicles', image: require('../../../assets/icons/categoryIcon/car.png') },
//     { id: '2', title: 'Animals', image: require('../../../assets/icons/categoryIcon/pet(1).png') },
//     { id: '3', title: 'Kids', image: require('../../../assets/icons/categoryIcon/stroller.png') },
//     { id: '4', title: 'Property For Sale', image: require('../../../assets/icons/categoryIcon/sale.png') },
//     { id: '5', title: 'Electronics', image: require('../../../assets/icons/categoryIcon/monitor.png') },
//     { id: '6', title: 'Bikes', image: require('../../../assets/icons/categoryIcon/motorcycle.png') },
//     { id: '7', title: 'Jobs', image: require('../../../assets/icons/categoryIcon/work.png') },
// ]

const category = []

function Categories() {
    const navigation = useNavigation()

    function emptyView() {
        return (
            <View style={[styles.flex, styles.emptyContainer]}>
                <Image
                    style={styles.emptyImage}
                    source={require('../../../assets/images/emptyView/noData.png')}
                />
                <TextDefault H5 center bold style={alignment.MTlarge}>
                    {'No category found.'}
                </TextDefault>
            </View>
        )
    }

    return (
        <SafeAreaView edges={['bottom']} style={[styles.flex, styles.safeAreaview]}>
            <View style={[styles.flex, styles.container]}>
                <FlatList
                    data={category}
                    style={styles.flatList}
                    contentContainerStyle={styles.categoryContainer}
                    ListEmptyComponent={emptyView}
                    showsHorizontalScrollIndicator={false}
                    ItemSeparatorComponent={() => <View style={styles.spacer} />}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            activeOpacity={0.5}
                            style={styles.categoryRow}
                            onPress={() => navigation.navigate('SubCategories', { headerTitle: item.title })}>
                            <View style={styles.rowContainer}>
                                <View style={styles.image}>
                                    <Image
                                        style={styles.imgResponsive}
                                        source={item.image}
                                        defaultSource={require('../../../assets/images/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png')}
                                    />
                                </View>
                                <TextDefault H5 style={styles.fontText}>
                                    {item.title}
                                </TextDefault>
                                <View style={styles.rightIcon}>
                                    <Entypo name='chevron-small-right' size={scale(20)} color={colors.buttonbackground} />
                                </View>
                            </View>

                        </TouchableOpacity>
                    )}
                />
            </View>
        </SafeAreaView>
    );
}

export default React.memo(Categories)
