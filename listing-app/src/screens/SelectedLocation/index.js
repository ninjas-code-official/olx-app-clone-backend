import React, { useState, useContext, useLayoutEffect } from 'react'
import { View, TouchableOpacity, StatusBar, Linking } from 'react-native'
import { LocationContext } from '../../context/Location'
import { useSafeArea } from 'react-native-safe-area-context'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import TextDefault from '../../components/Text/TextDefault/TextDefault'
import styles from './styles'
import screenOptions from './screenOptions'
import { useNavigation } from '@react-navigation/native'
import { useLocation } from '../../hooks/index'
import { FlashMessage } from '../../components'
import { mapStyle, colors } from '../../utilities'
import CustomMarker from '../../assets/SVG/imageComponents/CustomMarker'

const LATITUDE = 33.699265
const LONGITUDE = 72.974575
const LATITUDE_DELTA = 40
const LONGITUDE_DELTA = 40

export default function SelectLocation(props) {
  const { longitude, latitude } = props.route.params || {}
  const navigation = useNavigation()
  const inset = useSafeArea()
  const { getCurrentLocation, getLocationPermission } = useLocation()
  const { setLocation } = useContext(LocationContext)
  const [label, setLabel] = useState(
    longitude && latitude ? 'Current Location' : 'Selected Location'
  )
  // eslint-disable-next-line no-unused-vars
  const [coordinates, setCorrdinates] = useState({
    latitude: latitude || LATITUDE,
    longitude: longitude || LONGITUDE,
    latitudeDelta: latitude ? 0.003 : LATITUDE_DELTA,
    longitudeDelta: longitude ? 0.003 : LONGITUDE_DELTA
  })
  let mapRef = null
  useLayoutEffect(() => {
    navigation.setOptions(
      screenOptions({
        title: 'Set Location',
        fontColor: colors.fontMainColor,
        backColor: colors.white,
        iconColor: colors.fontThirdColor,
        lineColor: colors.lightHorizontalLine,
        setCurrentLocation
      })
    )
  })

  StatusBar.setBarStyle('dark-content')

  const setCurrentLocation = async() => {
    const { status, canAskAgain } = await getLocationPermission()
    if (status !== 'granted' && !canAskAgain) {
      FlashMessage({
        message:
          'Tap on this message to open Settings then allow app to use location from permissions.',
        onPress: async() => {
          await Linking.openSettings()
        }
      })
      return
    }
    const { error, coords, message } = await getCurrentLocation()
    if (error) {
      FlashMessage({
        message
      })
      return
    }
    mapRef.fitToCoordinates([{
      latitude: coords.latitude,
      longitude: coords.longitude
    }])
    setLabel('Current Location')
  }
  const onSelectLocation = () => {
    setLocation({
      label,
      deliveryAddress: label,
      latitude: coordinates.latitude,
      longitude: coordinates.longitude
    })
  }
  const onRegionChangeComplete = coordinates => {
    setCorrdinates({
      ...coordinates
    })
  }

  const onPanDrag = (event) => {
    setLabel('Selected Location')
  }
  return (
    <>
      <View style={styles().flex}>
        <MapView
          ref={ref => {
            mapRef = ref
          }}
          initialRegion={coordinates}
          // region={coordinates}
          style={{ height: '92%' }}
          provider={PROVIDER_GOOGLE}
          showsTraffic={false}
          maxZoomLevel={15}
          customMapStyle={mapStyle}
          onRegionChangeComplete={onRegionChangeComplete}
          onPanDrag={onPanDrag} />
        <View
          style={{
            width: 50,
            height: 50,
            position: 'absolute',
            top: '46%',
            left: '50%',
            zIndex: 1,
            translateX: -25,
            translateY: -25,
            justifyContent: 'center',
            alignItems: 'center',
            transform: [{ translateX: -25 }, { translateY: -25 }]
          }}>
          <CustomMarker
            width={40}
            height={40}
            transform={[{ translateY: -20 }]}
            translateY={-20}
          />
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles().button}
          onPress={onSelectLocation}>
          <TextDefault textColor={colors.buttonText} H4 bold>
            {'Select Location'}
          </TextDefault>
        </TouchableOpacity>
      </View>
      <View style={{ paddingBottom: inset.bottom }} />
    </>
  )
}