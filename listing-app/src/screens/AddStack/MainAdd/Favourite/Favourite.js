import { useNavigation } from '@react-navigation/native';
import React, { useContext } from 'react'
import { FlatList, Image, View } from 'react-native';
import { useQuery, gql } from '@apollo/client'
import { likes } from '../../../../apollo/server'
import UserContext from '../../../../context/user'
import { EmptyButton, TextDefault, Spinner, TextError } from '../../../../components';
import { alignment, colors, textStyles } from '../../../../utilities';
import Card from './Card/Card';
import styles from './styles';
const LIKES = gql`${likes}`

// const data = [
//     {
//         id: '10',
//         title: 'Japanese 28 inches cycle',
//         price: 'Rs: 22,900',
//         location: 'Peshawar Road, Rawalpindi, Punjab',
//         image: require('../../../../assets/images/products/cycle.jpg')
//     }
// ]


function Favourite() {
    const navigation = useNavigation()
    const { loading, error, data } = useQuery(LIKES)
    const { profile, loadingProfile, errorProfile} = useContext(UserContext)
    function emptyView() {
        return (
            <View style={[styles.flex, styles.emptyContainer]}>
                <Image
                    style={styles.emptyImage}
                    source={require('../../../../assets/images/emptyView/favourite.png')}
                />
                <TextDefault H4 center bold style={alignment.MTlarge}>
                    {"You haven't liked anything yet."}
                </TextDefault>
                <TextDefault H5 center light style={alignment.MTsmall}>
                    {"Mark the items that you like and share it with the world!"}
                </TextDefault>
                <EmptyButton
                    title='Dicover'
                    onPress={() => navigation.navigate('Main')}
                />
            </View>
        )
    }

    return (
        <View style={[styles.flex, styles.mainContainer]}>
            {loadingProfile ? <Spinner spinnerColor={colors.spinnerColor1} backColor={'transparent'} /> :
                errorProfile ? <TextError text={errorProfile.message} textColor={colors.fontThirdColor} style={textStyles.Light} /> :
                    <FlatList
                        data={profile.likes || []}
                        // || 
                        style={styles.flex}
                        contentContainerStyle={{ flexGrow: 1 }}
                        keyExtractor={item => item._id}
                        ListEmptyComponent={emptyView}
                        numColumns={2}
                        renderItem={({ item }) => (
                            <Card {...item} />
                        )}
                    />}
        </View>
    )
}

export default React.memo(Favourite)