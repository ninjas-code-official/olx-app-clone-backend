import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useLayoutEffect } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { gql, useQuery } from '@apollo/client';
import { TextDefault, Spinner, TextError } from '../../../components';
import { colors } from '../../../utilities';
import { subCategories } from '../../../apollo/server';
import styles from './styles';

const GET_SUB_CATEGORIES = gql`${subCategories}`


function SubCategories() {
    const navigation = useNavigation()
    const route = useRoute()
    const headerTitle = route?.params?.headerTitle ?? null
    const categoryId = route.params?.categoryId ?? null
    const { loading, error, data } = useQuery(GET_SUB_CATEGORIES, { variables: { id: categoryId } })


    useLayoutEffect(() => {
        navigation.setOptions({
            title: headerTitle
        })
    }, [navigation, headerTitle])
    return (
        <SafeAreaView edges={['bottom']} style={[styles.flex, styles.safeAreaview]}>
            <View style={[styles.flex, styles.container]}>
                {loading ? <Spinner spinnerColor={colors.spinnerColor1} backColor={'transparent'} /> : error ? <TextError text={error.message} /> :
                    <FlatList
                        data={data ? data.subCategoriesById : []}
                        style={styles.flatList}
                        contentContainerStyle={styles.categoryContainer}
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={item => item._id}
                        ItemSeparatorComponent={() => <View style={styles.line} />}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                activeOpacity={0.5}
                                style={styles.categoryRow}
                                onPress={() => navigation.navigate('SellingForm', {subCategory: item._id})}
                            >
                                <TextDefault light H5 style={styles.fontText}>
                                    {item.title}
                                </TextDefault>
                            </TouchableOpacity>
                        )}
                    />
                }
            </View>
        </SafeAreaView>
    );
}

export default React.memo(SubCategories)
