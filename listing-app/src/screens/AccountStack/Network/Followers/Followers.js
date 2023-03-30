import React, { useContext } from 'react'
import { Image, View, FlatList, Share } from 'react-native'
import UserContext from '../../../../context/user'
import { EmptyButton, FlashMessage, TextDefault } from '../../../../components'
import { alignment, colors } from '../../../../utilities'
import Card from './Card'
import styles from './styles'


function Followers() {
    const { profile, loadingProfile, errorProfile} = useContext(UserContext)
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
                    {"You don't have followers yet."}
                </TextDefault>
                <TextDefault H5 center light style={alignment.MTsmall}>
                    {'Chat, post or start following somebody so they can follow you.'}
                </TextDefault>
            </View>
        )
    }

    function header() {
        return (
            <View style={styles.notificationContainer}>
                <View style={styles.imgResponsive}>
                    <Image style={styles.img} source={require('../../../../assets/images/emptyView/network.png')} />
                </View>
                <View style={styles.notificationText}>
                    <TextDefault textColor={colors.buttonbackground} H5 center >
                        {'APP is more fun shared with friends'}
                    </TextDefault>
                    <View style={{ width: '70%' }}>
                        <EmptyButton title='Invite Friends'
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
                data={profile.followers || []}
                ListEmptyComponent={emptyView()}
                ListHeaderComponent={profile?.followers?.length > 0 && header()}
                keyExtractor={(item, index) => item._id}
                renderItem={({ item }) => (
                    <Card {...item} />
                )}
            />
        </View>
    )
}
export default React.memo(Followers)