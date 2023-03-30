import { gql, useQuery } from '@apollo/client';
import { Entypo } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { FlatList, Image, TouchableOpacity, View } from 'react-native';
import { categories } from '../../../apollo/server';
import { Spinner, TextDefault, TextError } from '../../../components';
import { alignment, colors, scale } from '../../../utilities';
import styles from './styles';

const GET_CATEGORIES = gql`${categories}`

const COLORS = ['#ffd54d', '#6df8f3', '#ff7a7a', '#d5b09f', '#eccbcb']

function Categories() {
    const navigation = useNavigation()
    const route = useRoute()
    const { loading, error, data } = useQuery(GET_CATEGORIES)
    const screen = route.params?.screen ?? null


    function emptyView() {
        return (
            <View style={[styles.flex, styles.emptyContainer]}>
                <Image
                    style={styles.emptyImage}
                    source={require('../../../assets/images/emptyView/noData.png')}
                    defaultSource={require('../../../assets/images/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png')}
                />
                <TextDefault H5 center bold style={alignment.MTlarge}>
                    {'No category found.'}
                </TextDefault>
            </View>
        )
    }

    if (loading) return <Spinner spinnerColor={colors.spinnerColor1} />
    if (error) return <TextError text={error.message} />

    return (
        <View style={[styles.flex, styles.container]}>
            <FlatList
                data={data ? data.categories : []}
                style={styles.flatList}
                contentContainerStyle={styles.categoryContainer}
                ListEmptyComponent={emptyView}
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={() => <View style={styles.spacer} />}
                keyExtractor={item => item._id}
                renderItem={({ item, index }) => (
                    <TouchableOpacity
                        activeOpacity={0.5}
                        style={styles.categoryRow}
                        // onPress={() => navigation.dispatch(StackActions.push('SubCategories', { headerTitle: item.title, screen: screen }))}>
                        onPress={() => navigation.navigate('SubCategories', { headerTitle: item.title, categoryId: item._id, screen: screen })}>
                        <View style={styles.rowContainer}>
                            <View style={[styles.image, { backgroundColor: COLORS[index % 5] }]}>
                                <Image
                                    style={styles.imgResponsive}
                                    source={{ uri: item.image }}
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
                )
                }
            />

        </View >
    );
}

export default React.memo(Categories)
