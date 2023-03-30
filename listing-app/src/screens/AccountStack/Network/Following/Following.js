import { useNavigation } from '@react-navigation/native'
import React, {useContext} from 'react'
import { FlatList, Image, Share, View } from 'react-native'
import { EmptyButton, FlashMessage, TextDefault } from '../../../../components'
import { alignment, colors } from '../../../../utilities'
import UserContext from '../../../../context/user'
import Card from './Card'
import styles from './styles'

// const empty = false

function Following() {
    
    const navigation = useNavigation()
    const { profile } = useContext(UserContext)
    //console.log('following',profile.following)

    async function share() {
        try {
            const result = await Share.share({
                title: 'App link',
                message:
                    'Install this app and enjoy your friend community',
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                    FlashMessage({ message: 'The invitation has been sent', type: 'success' });
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            FlashMessage({ message: error.message, type: 'warning' });
        }
    }


    function emptyView() {
        return (
            <View style={[styles.flex, styles.emptyContainer]}>
                <Image
                    style={styles.emptyImage}
                    source={require('../../../../assets/images/emptyView/followers.png')}
                />
                <TextDefault H4 center bold style={alignment.MTlarge}>
                    {"You are not following anyone yet."}
                </TextDefault>
                <TextDefault H5 center light style={alignment.MTsmall}>
                    {'Start following people you know or like and get notified when they post something new!'}
                </TextDefault>
            </View>
        )
    }

    function header() {
        return (
            <View style={styles.notificationContainer}>
                <View style={styles.imgResponsive}>
                    <Image style={styles.img} source={require('../../../../assets/images/emptyView/notification.png')} />
                </View>
                <View style={styles.notificationText}>
                    <TextDefault textColor={colors.buttonbackground} H5 center >
                        {'Your followers will be notified when you post new ads'}
                    </TextDefault>
                    <View style={{ width: '70%' }}>
                        <EmptyButton
                            title='Invite Friends'
                            onPress={share} />
                    </View>
                </View>
            </View>
        )
    }
    return (
        <View style={[styles.flex, styles.mainContainer]}>
            <FlatList
                style={styles.flex}
                contentContainerStyle={[styles.mainContainer, { flexGrow: 1 }]}
                data={profile.following || []}
                ListEmptyComponent={emptyView()}
                ListHeaderComponent={profile?.following?.length > 0 && header()}
                keyExtractor={(item, index) => item._id}
                renderItem={({ item }) => (
                    < Card {...item} />
                )}
            />
        </View>
    )
}
export default React.memo(Following)