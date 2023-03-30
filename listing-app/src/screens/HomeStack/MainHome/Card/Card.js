import { FontAwesome, SimpleLineIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect, useContext } from 'react';
import { useMutation, gql } from '@apollo/client'
import { TouchableOpacity, View, Image } from 'react-native';
import { addToFavourites } from '../../../../apollo/server'
import { TextDefault, Spinner } from '../../../../components';
import { colors, scale } from '../../../../utilities';
import styles from '../styles';
import UserContext from '../../../../context/user'
import ConfigurationContext from '../../../../context/configuration'

const ADD_TO_FAVOURITES = gql`${addToFavourites}`

function Card(props) {
    const navigation = useNavigation()
    const { isLoggedIn, profile } = useContext(UserContext)
    const configuration = useContext(ConfigurationContext)
    const [isLike, isLikeSetter] = useState(false)
    const [mutate, { loading: loadingMutation }] = useMutation(ADD_TO_FAVOURITES)
    useEffect(() => {
        if (isLoggedIn) {
            isLikeSetter(
                profile.likes
                    ? !!profile.likes.find(like => like._id === props._id)
                    : false
            )
        } else {
            isLikeSetter(false)
        }
    }, [profile, isLoggedIn])
    return (
        <TouchableOpacity activeOpacity={1}
            style={styles.productCardContainer}
            onPress={() => navigation.navigate('ProductDescription',
                { screen: 'ProductDescription', params: { product: props } })}>
            <View style={styles.topCardContainer}>
                <Image
                    source={{ uri: props.images[0] }}
                    resizeMode="cover"
                    style={styles.imgResponsive}
                    defaultSource={require('../../../../assets/images/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png')}
                />
                <TouchableOpacity activeOpacity={0}
                    onPress={() => {
                        if (isLoggedIn) {
                            mutate({
                                variables: {
                                    item: props._id
                                }
                            })
                            isLikeSetter(prev => !prev)
                        } else {
                            navigation.navigate('Registration')
                        }
                    }}
                    style={styles.heartContainer}>
                    {loadingMutation && <Spinner size='small' spinnerColor={colors.spinnerColor1} backColor={'transparent'} />}
                    {(isLike && !loadingMutation) && <FontAwesome name="heart" size={scale(18)} color={colors.black} />}
                    {(!isLike && !loadingMutation) && <FontAwesome name="heart-o" size={scale(18)} color={colors.horizontalLine} />
                    }
                </TouchableOpacity>
            </View>
            <View style={styles.botCardContainer}>
                <View>
                    <TextDefault textColor={colors.fontMainColor} H5 bolder>
                        {configuration.currencySymbol} {props.price}
                    </TextDefault>
                    <TextDefault textColor={colors.fontSecondColor} numberOfLines={1}>
                        {props.title}
                    </TextDefault>
                </View>
                <View style={styles.locationBottom}>
                    <SimpleLineIcons name="location-pin" size={scale(15)} color={colors.buttonbackground} />
                    <TextDefault textColor={colors.fontSecondColor} numberOfLines={1} light small style={styles.locationText}>
                        {props.address.address}
                    </TextDefault>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default React.memo(Card)