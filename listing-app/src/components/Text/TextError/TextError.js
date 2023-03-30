import React from 'react'
import { View } from 'react-native'
import TextDefault from '../TextDefault/TextDefault'
import PropTypes from 'prop-types'
import { colors } from '../../../utilities'

function TextError(props) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: props.backColor
          ? props.backColor
          : colors.containerDark
      }}>
      <TextDefault
        style={props.style}
        textColor={
          props.textColor ? props.textColor : colors.fontMainColor
        }
        bold
        H5
        center>
        {props.text}{' '}
      </TextDefault>
    </View>
  )
}
TextError.propTypes = {
  text: PropTypes.string,
  backColor: PropTypes.string,
  textColor: PropTypes.string
}
export default TextError
