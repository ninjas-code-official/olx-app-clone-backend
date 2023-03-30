import { showMessage } from 'react-native-flash-message'
import styles from './styles'
import PropTypes from 'prop-types'

export const FlashMessage = props => {
  showMessage({
    hideOnPress: true,
    hideStatusBar: false,
    message: props.message,
    type: props.type,
    position: props.position ?? 'top',
    floating: false,
    titleStyle: styles.text,
  })
}
FlashMessage.propTypes = {
  message: PropTypes.string.isRequired
}
