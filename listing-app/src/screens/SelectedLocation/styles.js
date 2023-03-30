import { colors } from '../../utilities'

const { StyleSheet } = require('react-native')

const styles = () =>
  StyleSheet.create({
    flex: {
      flex: 1
    },
    button: {
      width: '100%',
      height: '8%',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.buttonbackground
    },
    overlay: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.2)'
    }
  })
export default styles