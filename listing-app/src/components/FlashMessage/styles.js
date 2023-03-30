
import { StyleSheet, Dimensions } from 'react-native'
import { textStyles, alignment } from '../../utilities'
const { height } = Dimensions.get('window')

const styles = StyleSheet.create({
  text: {
    ...textStyles.H5,
    ...textStyles.Center
  },
})
export default styles
