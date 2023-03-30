import * as Location from 'expo-location'
import * as Permission from 'expo-permissions'

export default function useLocation() {
  const getLocationPermission = async() => {
    const { status, canAskAgain } = await Permission.getAsync(
      Permission.LOCATION
    )
    return { status, canAskAgain }
  }

  const askLocationPermission = async() => {
    let finalStatus = null
    let finalCanAskAgain = null
    const {
      status: currentStatus,
      canAskAgain: currentCanAskAgain,
      permissions: { location: { foregroundStatus } }
    } = await Permission.getAsync(Permission.LOCATION)
    finalStatus = currentStatus === 'granted' || foregroundStatus === 'granted' ? 'granted' : 'denied'
    finalCanAskAgain = currentCanAskAgain
    if (currentStatus === 'granted' || foregroundStatus === 'granted') {
      return { status: finalStatus, canAskAgain: finalCanAskAgain }
    }
    if (currentCanAskAgain) {
      const { status, canAskAgain, permissions: { location: { foregroundStatus } } } = await Permission.askAsync(
        Permission.LOCATION
      )
      finalStatus = status === 'granted' || foregroundStatus === 'granted' ? 'granted' : 'denied'
      finalCanAskAgain = canAskAgain
      if (status === 'granted' || foregroundStatus === 'granted') {
        return { status: finalStatus, canAskAgain: finalCanAskAgain }
      }
    }
    return { status: finalStatus, canAskAgain: finalCanAskAgain }
  }

  const getCurrentLocation = async() => {
    const { status } = await askLocationPermission()
    if (status === 'granted') {
      try {
        const location = await Location.getCurrentPositionAsync({
          enableHighAccuracy: true
        })
        return { ...location, error: false }
      } catch (e) {
        return { error: true, message: e.message }
      }
    }
    return { error: true, message: 'Location permission was not granted' }
  }

  return { getCurrentLocation, getLocationPermission }
}