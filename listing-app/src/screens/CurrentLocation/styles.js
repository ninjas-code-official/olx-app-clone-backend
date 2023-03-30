import { StyleSheet } from 'react-native'
import { alignment } from '../../utilities/alignment'
import { scale } from '../../utilities/scaling'
import { color } from 'react-native-reanimated'
import { colors } from '../../utilities'

const styles = () =>
  StyleSheet.create({
    flex: {
      flex: 1
    },
    screenBackground: {
      backgroundColor: '#FFF'
    },
    subContainerImage: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    imageContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      ...alignment.MBlarge
    },
    image: {
      width: scale(100),
      height: scale(100)
    },
    descriptionEmpty: {
      justifyContent: 'center',
      alignItems: 'center',
      ...alignment.Plarge
    },
    emptyButton: {
      width: '80%',
      height: '5%',
      backgroundColor: colors.spinnerColor1,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center'
    },
    linkButton: {
      ...alignment.Pmedium,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'transparent'
    }
  })

export default styles