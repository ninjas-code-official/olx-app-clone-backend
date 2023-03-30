import { StyleSheet } from 'react-native'
import { colors, alignment } from '../../../utilities'

const styles = StyleSheet.create({
  flex: {
    flex: 1
  },
  mainBackground: {
    backgroundColor: colors.themeBackground
  },
  container: {
    height: '92%'
  },
  button: {
    position: 'absolute',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 0,
    height: '8%',
    width: '100%',
    backgroundColor: colors.spinnerColor1
  },
})
export default styles
