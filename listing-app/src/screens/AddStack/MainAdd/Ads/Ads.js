import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react'
import { useQuery, gql } from '@apollo/client'
import { View, TouchableOpacity, FlatList, RefreshControl, Image } from 'react-native';
import { AddFilter, EmptyButton, TextDefault, Spinner } from '../../../../components';
import { alignment, colors, scale } from '../../../../utilities';
import styles from './styles';
import { Feather } from '@expo/vector-icons'
import { itemsByUser } from '../../../../apollo/server'

const ITEMS_BY_USER = gql`${itemsByUser}`

import Card from './Card';


function Ads() {
    const navigation = useNavigation()
    const [visible, setVisible] = useState(false)
    const [filter, setFilter] = useState({
        value: 'ALL',
        title: 'View All'
    })
    const { data, refetch, networkStatus, loading, error } = useQuery(ITEMS_BY_USER)

    function onModalToggle() {
        setVisible(prev => !prev)
    }

    function search(filter) {
        const queryData = data?.itemsByUser
        if (filter.value === 'ALL') {
            return (queryData)
        }
        else if (filter.value ==='INACTIVE'){
            const ads = queryData.filter(item => {
                if (item.status === 'SOLD' || item.status ==='DEACTIVATED') {
                    return item
                }
            })
            return (ads)
        }
        else {
            const ads = queryData.filter(item => {
                if (item.status === filter.value) {
                    return item
                }
            })
            return (ads)
        }
    }

    if (error) {
        return <TextDefault>{JSON.stringify(error)}</TextDefault>
    }
    if (loading) {
        return <Spinner spinnerColor={colors.spinnerColor1} backColor={'transparent'} />
    }

    
    const filteredData=data?.itemsByUser ? search(filter):[]
    function emptyView() {
        return (
            <View style={[styles.flex, styles.emptyContainer]}>
                <Image
                    style={styles.emptyImage}
                    source={require('../../../../assets/images/emptyView/ads.png')}
                />
                <TextDefault H4 center bold style={alignment.MTlarge}>
                    {"You haven't listed anything yet."}
                </TextDefault>
                <TextDefault H5 center light style={alignment.MTsmall}>
                    {"Let go of what you don't use anymore"}
                </TextDefault>
                <EmptyButton
                    title='Start selling'
                    onPress={() => navigation.navigate('Sell', { screen: 'Home' })}
                />
            </View>
        )
    }

    function header() {
        return (
            <TouchableOpacity style={styles.smallContainer}
                onPress={onModalToggle}
            >
                <TextDefault bolder H5 style={alignment.PRsmall}>
                    {`${filter.title} (${filteredData.length})`}
                </TextDefault>
                <Feather name="chevron-down" size={scale(15)} color={colors.fontSecondColor} />
            </TouchableOpacity>
        )
    }
    
    return (
        <View style={[styles.flex, styles.mainContainer]}>
            <FlatList
                data={filteredData}
                style={styles.flex}
                contentContainerStyle={{ flexGrow: 1 }}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={emptyView}
                ListHeaderComponent={header}
                keyExtractor={(item, index) => item._id}
                stickyHeaderIndices={[0]}
                refreshControl={
                    <RefreshControl
                      // colors={colors.spinnerColor1}
                      refreshing={networkStatus === 4}
                      onRefresh={() => {
                        if (networkStatus === 7) {
                          refetch()
                        }
                      }}
                    />
                  }
                renderItem={({ item, index }) => (
                    <Card {...item} />
                )}
            />

            <AddFilter visible={visible}
                onModalToggle={onModalToggle}
                setFilter={setFilter}
                />
        </View>
    )
}

export default React.memo(Ads)