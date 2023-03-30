import React, { useContext, useEffect } from 'react'
import { FontAwesome } from '@expo/vector-icons'
import { View, FlatList, Image } from 'react-native'
import { TextDefault, Spinner } from '../../../components'
import { alignment, colors, scale } from '../../../utilities'
import styles from './styles'
import UserContext from '../../../context/user'
import moment from 'moment'

function Notifications() {
    const { isLoggedIn, profile, setRefetchNeeded, loadingProfile  } = useContext(UserContext)
    useEffect(()=>{
        setRefetchNeeded(true)
    },[])
    function emptyView() {
        return (
            <View style={[styles.flex, styles.emptyContainer]}>
                <Image
                    style={styles.emptyImage}
                    source={require('../../../assets/images/emptyView/notification.png')}
                />
                <TextDefault H4 center bold style={alignment.MTlarge}>
                    {'No Notifications'}
                </TextDefault>
                <TextDefault textColor={colors.fontSecondColor} center style={alignment.MTmedium}>
                    {'Check back here for updates!'}
                </TextDefault>
            </View>
        )
    }

    function getDate(date) {
        const formatDate = moment(+date).format('DD/MM/YY hh:mm:ss')
        return formatDate
    }

    return (
        <View style={[styles.flex, styles.mainContainer]}>
            {loadingProfile? <Spinner />:
            <FlatList
                data={isLoggedIn ? profile?.notifications : []}
                style={[styles.flex, styles.flatList]}
                contentContainerStyle={{ flexGrow: 1, backgroundColor: colors.containerBox }}
                keyExtractor={item => item._id}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={emptyView}
                renderItem={({ item, index }) => (
                    <View key={item._id} style={styles.notificationRow}>
                        <TextDefault light style={styles.fontText}>
                            <FontAwesome name="bell" size={scale(12)} color={colors.black} />
                            {'  '}{item.message}
                        </TextDefault>
                        <TextDefault style={{paddingRight:10,fontSize:12}} thin right>{getDate(item.date)}</TextDefault>
                    </View>
                )}
            />}
        </View>
    )
}

export default React.memo(Notifications)