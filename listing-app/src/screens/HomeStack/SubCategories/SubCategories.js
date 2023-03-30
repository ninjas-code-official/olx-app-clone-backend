import { gql, useQuery } from '@apollo/client';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useLayoutEffect } from 'react';
import { FlatList, TouchableOpacity, View, Image } from 'react-native';
import { subCategories } from '../../../apollo/server';
import { EmptyButton, FlashMessage, Spinner, TextDefault, TextError } from '../../../components';
import { alignment, colors } from '../../../utilities';
import styles from './styles';

const GET_SUB_CATEGORIES = gql`${subCategories}`

function SubCategories() {
    const navigation = useNavigation()
    const route = useRoute()
    const categoryId = route.params?.categoryId ?? null
    const { loading, error, data } = useQuery(GET_SUB_CATEGORIES, { variables: { id: categoryId } })
    const headerTitle = route?.params?.headerTitle ?? null
    const screen = route.params?.screen ?? null

    useLayoutEffect(() => {
        navigation.setOptions({
            title: headerTitle
        })
    }, [navigation, headerTitle])

    useEffect(() => {
        if (!categoryId) {
            FlashMessage({ message: 'Something is wrong', type: 'warning' })
            navigation.goBack()
        }
    }, [categoryId, route])

    function navigateScreen(title, id) {
        if (screen === 'Filter')
            navigation.navigate('FilterModal', { search: title })
        else if (id) {
            navigation.navigate('ProductListing', { search: title, subCategory: [id] })
        }
        else {
            const subCategory = data?.subCategoriesById ? data.subCategoriesById.map(({_id}) => _id) : []
            navigation.navigate('ProductListing', { search: title, subCategory })
        }

    }

    function emptyView() {
        return (
            <View style={[styles.flex, styles.emptyContainer]}>
                <Image
                    style={styles.emptyImage}
                    source={require('../../../assets/images/emptyView/investigate.png')}
                />
                <TextDefault H5 center bold style={alignment.MTlarge}>
                    {'There is no sub-category.'}
                </TextDefault>
                <View style={styles.buttonView}>
                    <EmptyButton
                        title='View All'
                        onPress={() => navigateScreen('View All')}
                    />
                </View>
            </View>
        )
    }

    function footer() {
        return (
            <TouchableOpacity
                activeOpacity={0.5}
                style={styles.categoryRow}
                onPress={() => navigateScreen('View All')}>
                <TextDefault light H5 style={styles.fontText}>
                    {'View All'}
                </TextDefault>
            </TouchableOpacity>
        )
    }

    if (error) return <TextError text={error.message} />
    if (loading) return <Spinner spinnerColor={colors.spinnerColor1} />
    return (
        <View style={[styles.flex, styles.container]}>
            <FlatList
                data={data ? data.subCategoriesById : []}
                style={styles.flatList}
                contentContainerStyle={styles.categoryContainer}
                showsHorizontalScrollIndicator={false}
                ListEmptyComponent={emptyView}
                ListFooterComponent={data.subCategoriesById.length > 1 ? footer : null}
                keyExtractor={item => item._id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        activeOpacity={0.5}
                        style={styles.categoryRow}
                        onPress={() => navigateScreen(item.title, item._id)}
                    >
                        <TextDefault light H5 style={styles.fontText}>
                            {item.title}
                        </TextDefault>
                    </TouchableOpacity>
                )}
            />

        </View>
    );
}

export default React.memo(SubCategories)
