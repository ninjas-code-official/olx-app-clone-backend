import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import React, { useState, useContext } from 'react'
import { Platform, View, Image } from 'react-native'
import { useMutation, gql } from '@apollo/client'
import { BaseButton, BorderlessButton, RectButton } from 'react-native-gesture-handler'
import { FlashMessage, TextDefault, Spinner } from '../../../../components'
import { alignment, colors, scale } from '../../../../utilities'
import ConfigurationContext from '../../../../context/configuration'
import { updateItemStatus } from '../../../../apollo/server'
import styles from './styles'
import moment from 'moment'

const UPDATE_ITEM_STATUS = gql`${updateItemStatus}`

function Card(props) {
    const navigation = useNavigation()
    const [deleteBox, setDeletebox] = useState(false)
    const [opacity, setopacity] = useState(1)
    const [imageLoading, setImageLoading] = useState(false)
    const configuration = useContext(ConfigurationContext)
    const [
        mutate,
        { loading }
    ] = useMutation(UPDATE_ITEM_STATUS, { onCompleted, onError, update })
    function onBoxToggle() {
        setDeletebox(prev => !prev)
    }

    function onCompleted({ updateItemStatus }) {
        if (updateItemStatus) {
            FlashMessage({ message: 'Status Updated', type: 'success' })
        }
    }

    function onError(error) {
        FlashMessage({ message: error.message, type: 'error' })
    }

    function update(cache, { data: { updateItemStatus } }) {
        if (updateItemStatus.status === 'DELETE')
            cache.modify({
                _id: cache.identify(updateItemStatus),
                fields: {
                    itemsByUser(existingItemsByUser, { DELETE }) {
                        return DELETE;
                    },
                },
            });
    }

    function navigateScreen() {
        if (deleteBox)
            setDeletebox(false)
        else {
            navigation.navigate('ProductDescription', { screen: 'ProductDescription', params: { product: props } })
        }
    }

    function updateStatus(status) {
        if (props.status !== status) {
            mutate({
                variables: {
                    id: props._id,
                    status: status
                }
            })
        } else {
            FlashMessage({ message: 'No Change in status' })
        }
        onBoxToggle()
    }

    function editAd(data) {
        onBoxToggle()
        navigation.navigate('SellingForm', { screen: 'SellingForm', params: { editProduct: props } })
    }

    function activeState(data) {
        if (data)
            setopacity(0.5)
        else
            setopacity(1)
    }

    function getDate(date) {
        const formatDate = moment(+date).format('DD MMM YYYY')
        return formatDate
    }

    return (
        <>
            <View
                style={[styles.adContainer, { borderLeftColor: props.status === 'DEACTIVATED' ? colors.google : props.status === 'ACTIVE' ? colors.activeLine : props.status === 'SOLD' ? colors.selectedText : colors.horizontalLine }]}>
                <BaseButton onPress={navigateScreen} activeOpacity={0.04} onActiveStateChange={activeState}
                    style={{ opacity: Platform.OS === 'ios' ? opacity : 1 }}>
                    <View style={[styles.dateRow, { flexDirection: "row", alignItems: "center", ...alignment.PTxSmall, ...alignment.PBxSmall }]}>
                        <TextDefault small textColor={colors.fontSecondColor} uppercase style={[styles.flex, alignment.PLsmall, {}]}>
                            {'From: '} <TextDefault small bold>{getDate(props.createdAt)}</TextDefault>
                            {/* {' -To: '} <TextDefault bold small>{props.endingDate}</TextDefault> */}
                        </TextDefault>
                        {!loading ?
                            <BorderlessButton style={alignment.PxSmall} onPress={onBoxToggle}>
                                <MaterialCommunityIcons name="dots-vertical" size={scale(20)} color="black" />
                            </BorderlessButton > :
                            <Spinner style={{ alignItems: "flex-end", ...alignment.PxSmall }} spinnerColor={colors.spinnerColor1} size='small' backColor='transparent' />}
                    </View>

                    <View style={[styles.InfoContainer, { zIndex: 0 }]}>
                        <Image
                            source={{ uri: props.images[0] }}
                            style={styles.imgResponsive}
                            defaultSource={require('../../../../assets/images/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png')}
                        />
                        <View style={[styles.flex, styles.descriptionContainer]}>
                            <View>
                                <TextDefault bold>
                                    {props.title}
                                </TextDefault>
                                <TextDefault style={alignment.PTxSmall}>
                                    {configuration.currencySymbol} {props.price}
                                </TextDefault>
                            </View>
                            <View style={styles.locationRow}>
                                <View style={styles.Vline}>
                                    <MaterialCommunityIcons name="eye-outline" size={scale(15)} color={colors.headerText} />
                                    <TextDefault numberOfLines={1} small bold style={styles.locationText}>
                                        {'Views:'} <TextDefault small light> {props.status === 'PENDING' ? '-' : props.views}</TextDefault>
                                    </TextDefault>
                                </View>
                                <FontAwesome name="heart" size={scale(13)} color={colors.headerText} />
                                <TextDefault numberOfLines={1} small bold style={styles.locationText}>
                                    {'Likes:'} <TextDefault small light> {props.likesCount}</TextDefault>
                                </TextDefault>
                            </View>
                        </View>
                    </View>
                    <View style={styles.statusContainer}>
                        <View style={[styles.statusBox, props.status === 'DEACTIVATED' ? styles.deactivateStatus : props.status === 'ACTIVE' ? styles.activeStatus : props.status === 'SOLD' ? styles.soldStatus : styles.pendingStatus]}>
                            <TextDefault textColor={(props.status === 'PENDING' || props.status === 'SOLD' || props.status === 'DEACTIVATED') ? colors.white : colors.fontMainColor} uppercase small bolder>
                                {props.status}
                            </TextDefault>
                        </View>
                        <TextDefault style={alignment.MTxSmall}>
                            {props.status === 'DEACTIVATED' ? 'This ad is currently deactivated' : props.status === 'ACTIVE' ? 'This ad is currently live' : 'This ad is being processed and it will be live soon'}
                        </TextDefault>
                    </View>
                    {deleteBox &&
                        <View style={{
                            width: '50%',
                            backgroundColor: colors.containerBox,
                            shadowColor: colors.horizontalLine,
                            shadowOffset: {
                                width: 1,
                                height: 2
                            },
                            shadowOpacity: 0.7,
                            shadowRadius: scale(5),
                            elevation: 15,
                            position: 'absolute',
                            right: scale(10),
                            top: scale(30),
                            zIndex: 1
                        }}>
                            <RectButton disallowInterruption={false} style={alignment.Psmall} onPress={() => editAd(props)}>
                                <TextDefault H5 bold uppercase>
                                    {'Edit'}
                                </TextDefault>
                            </RectButton>
                            <RectButton style={alignment.Psmall} onPress={() => updateStatus('DELETE')}>
                                <TextDefault H5 bold uppercase>
                                    {'Delete'}
                                </TextDefault>
                            </RectButton>
                            <RectButton style={alignment.Psmall} onPress={() => updateStatus(props.status === 'DEACTIVATED' ? 'ACTIVE' : 'DEACTIVATED')}>
                                <TextDefault H5 bold uppercase>
                                    {props.status === 'DEACTIVATED' ? 'Activate' : 'Deactivate'}
                                </TextDefault>
                            </RectButton>
                            <RectButton style={alignment.Psmall} onPress={() => updateStatus('SOLD')}>
                                <TextDefault H5 bold uppercase>
                                    {'Mark as sold'}
                                </TextDefault>
                            </RectButton>
                        </View>
                    }
                </BaseButton>
            </View>
        </>
    )
}

export default React.memo(Card)