import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useContext, useState, useEffect } from 'react';
import { useMutation, gql } from '@apollo/client'
import { TouchableOpacity, View, Image } from 'react-native';
import { TextDefault, Spinner } from '../../../../../components';
import { colors, scale } from '../../../../../utilities';
import ConfigurationContext from '../../../../../context/configuration'
import UserContext from '../../../../../context/user'
import { addToFavourites } from '../../../../../apollo/server'
import styles from '../styles';

const ADD_TO_FAVOURITES = gql`${addToFavourites}`


function Card(props) {
    const navigation = useNavigation()
    const configuration = useContext(ConfigurationContext)
    const { profile, isLoggedIn } = useContext(UserContext)
    const [isLike, isLikeSetter] = useState(false)

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

    const [mutate, { loading: loadingMutation }] = useMutation(ADD_TO_FAVOURITES)
    return (
        <TouchableOpacity activeOpacity={1}
            style={styles.productCardContainer}
            onPress={() => navigation.navigate('ProductDescription', { screen: 'ProductDescription', params: { product: props } })}>
            <View style={styles.topCardContainer}>
                <Image
                    source={{ uri: props.images[0] }}
                    resizeMode="cover"
                    style={styles.imgResponsive}
                    defaultSource={require('../../../../../assets/images/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png')}
                />
                <View activeOpacity={0}
                    style={styles.heartContainer}>
                    <TouchableOpacity activeOpacity={0} onPress={
                        () => {
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
                        }
                    }>
                        {loadingMutation && <Spinner size='small' spinnerColor={colors.spinnerColor1} backColor={'transparent'} />}
                        {(isLike && !loadingMutation) && <FontAwesome name="heart" size={scale(18)} color={colors.black} />}
                        {(!isLike && !loadingMutation) && <FontAwesome name="heart-o" size={scale(18)} color={colors.horizontalLine} />
                        }
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.botCardContainer}>
                <TextDefault numberOfLines={2} textColor={colors.fontMainColor}>
                    {props.title}
                </TextDefault>
                <TextDefault textColor={colors.fontMainColor}>
                    {configuration.currencySymbol} {props.price}
                </TextDefault>
            </View>
        </TouchableOpacity>
    )
}

export default React.memo(Card)