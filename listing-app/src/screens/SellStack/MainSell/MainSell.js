import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useLayoutEffect } from 'react';
import { FlatList, TouchableOpacity, View, Image } from 'react-native';
import { FlashMessage, LeftButton, TextDefault, Spinner, TextError } from '../../../components';
import { useQuery, gql } from '@apollo/client'
import { colors } from '../../../utilities';
import { categories } from '../../../apollo/server';
import styles from './styles';
import { SafeAreaView } from 'react-native-safe-area-context';
const GET_CATEGORIES = gql`${categories}`

function MainSell() {
    const navigation = useNavigation()
    const { loading, error, data } = useQuery(GET_CATEGORIES)
    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'What are you offering?',
            headerLeft: (props) => <LeftButton icon='close' iconColor={colors.headerText} />
        })

    })
    return (
        <SafeAreaView edges={['bottom']} style={styles.flex}>
            {loading? <Spinner  spinnerColor={colors.spinnerColor1} backColor={'transparent'}/>: error?<TextError text={error.message} />:
            <FlatList
                data={data ? data.categories : []}
                style={[styles.flex, styles.container]}
                contentContainerStyle={styles.flatListContent}
                ItemSeparatorComponent={() => <View style={styles.seperator} />}
                keyExtractor={item => item._id}
                numColumns={2}
                renderItem={({ item, index }) => (
                    <TouchableOpacity
                        style={[styles.mainContainer, index % 2 == 0 && styles.borderStyle]}
                        onPress={() =>  navigation.navigate('SubCategories', { headerTitle: item.title, categoryId: item._id })}>
                        <View style={styles.imageView}>
                            <Image
                                style={styles.imgResponsive}
                                source={{uri:item.image}}
                                resizeMode='cover'
                                defaultSource={require('../../../assets/images/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png')}
                            />
                        </View>
                        <TextDefault light center>
                            {item.title}
                        </TextDefault>
                    </TouchableOpacity>
                )
                }
            />}
        </SafeAreaView>
    );
}

export default MainSell
