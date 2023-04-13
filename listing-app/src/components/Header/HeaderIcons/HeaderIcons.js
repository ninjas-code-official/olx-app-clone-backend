import React, { useState } from 'react'
import {
  Ionicons,
  EvilIcons,
  MaterialIcons,
  MaterialCommunityIcons
} from '@expo/vector-icons'
import styles from './styles'
import { StackActions, useNavigation } from '@react-navigation/native'
import { HeaderBackButton } from '@react-navigation/stack'
import PropTypes from 'prop-types'
import { alignment, colors, scale } from '../../../utilities'
import { View, TouchableOpacity, Modal, Dimensions } from 'react-native'
import { BorderlessButton } from 'react-native-gesture-handler'
import { TextDefault } from '../../Text'
import { useSafeAreaInsets } from 'react-native-safe-area-context'


function BackButton(props) {
  if (props.icon === 'leftArrow') {
    return (
      <Ionicons
        name="ios-arrow-back"
        size={scale(30)}
        style={styles.leftIconPadding}
        color={props.iconColor}
      />
    )
  } else if (props.icon === 'menu') {
    return (
      <MaterialIcons
        name="menu"
        size={scale(30)}
        style={styles.leftIconPadding}
        color={props.iconColor}
      />
    )
  } else if (props.icon === 'share') {
    return (
      <EvilIcons
        name="share-google"
        size={scale(30)}
        style={styles.leftIconPadding}
        color={props.iconColor}
      />
    )
  } else if (props.icon === 'dots') {
    return (
      <MaterialCommunityIcons
        name="dots-vertical"
        size={scale(30)}
        style={styles.rightIconPadding}
        color={props.iconColor}
      />
    )
  }else if (props.icon === 'target') {
    return (
      <MaterialIcons
        name="my-location"
        size={scale(20)}
        color={props.iconColor}
      />
    )
  } else {
    return (
      <Ionicons
        name="md-close"
        size={scale(30)}
        style={styles.leftIconPadding}
        color={props.iconColor}
      />
    )
  }
}

function LeftButton(props) {
  const navigation = useNavigation()
  if (props.icon === 'back') {
    return (
      <HeaderBackButton
        labelVisible={false}
        backImage={() =>
          BackButton({ iconColor: props.iconColor, icon: 'leftArrow' })
        }
        onPress={() => {
          navigation.goBack()
        }}
      />
    )
  } else if (props.icon === 'close' && props.action === 'POP') {
    return (
      <HeaderBackButton
        labelVisible={false}
        backImage={() =>
          BackButton({ iconColor: props.iconColor, icon: 'close' })
        }
        onPress={() => {
          navigation.dispatch(StackActions.pop())
        }}
      />
    )
  } else if (props.icon === 'close') {
    return (
      <HeaderBackButton
        labelVisible={false}
        backImage={() =>
          BackButton({ iconColor: props.iconColor, icon: 'close' })
        }
        onPress={() => {
          if (props.navigate)
            props.navigate()
          else
            navigation.goBack()
          // navigation.dispatch(state => {
          //   const routes = state.routes.filter(r => r.name === 'Menu')
          //   return CommonActions.reset({
          //     ...state,
          //     routes,
          //     index: 0
          //   })
          // })
        }}
      />
    )
  }
}
function RightButton(props) {
  const [password, setPassword] = useState(false)
  const inset = useSafeAreaInsets()
  const [open, setOpen] = useState(false)

  function togglePassword() {
    setPassword(prev => !prev)
  }
  if (props.icon === 'share') {
    return (
      <HeaderBackButton
        onPress={props.onPress}
        labelVisible={false}
        backImage={() =>
          BackButton({ iconColor: props.iconColor, icon: 'share'})
        }
      />
    )
  } else if (props.icon === 'dots') {
    return (
      <View>
        {password ? (
          <Modal
            animationType="fade"
            transparent={true}
            visible={password}
            onRequestClose={() => setPassword(false)}
          >
            <TouchableOpacity activeOpacity={1} style={{ flex: 1 }} onPress={() => {
              props.share
              setPassword(false)
            }} >
              <BorderlessButton
                onPress={props.share}
                borderless={false}
                style={[styles.shareBtn, { top: inset.top }]}
              >
                <TextDefault textColor={colors.headerText} H5 bold style={styles.flex}>
                  {'Share Profile'}
                </TextDefault>
              </BorderlessButton>
            </TouchableOpacity>
          </Modal>

        ) : (
            <HeaderBackButton
              labelVisible={false}
              backImage={
                () => BackButton({ iconColor: props.iconColor, icon: 'dots' })
              }
              onPress={togglePassword}
            />
          )
        }
      </View >
    )
  }
  else if (props.icon === 'text') {
    return (
      <BorderlessButton
        onPress={props.onPress}
        borderless={false}
        style={styles.rightOuter}
      >
        <TextDefault textColor={props.iconColor} H5 style={styles.textIcon}>
          {props.title}
        </TextDefault>
      </BorderlessButton>
    )
  }else if (props.icon === 'target') {
    return (
      <HeaderBackButton
        pressColorAndroid={'#002f34'}
        labelVisible={false}
        backImage={() => (
          <View style={[styles.rightContainer, { ...alignment.PRsmall }]}>
            {BackButton({ iconColor: props.iconColor, icon: 'target' })}
          </View>
        )}
        onPress={props.onPressRight}
      />
    )
  } else {
    return null
  }
}

BackButton.propTypes = {
  icon: PropTypes.string,
  iconColor: PropTypes.string.isRequired
}
LeftButton.propTypes = {
  action: PropTypes.string,
  icon: PropTypes.string,
  iconColor: PropTypes.string.isRequired
}
RightButton.propTypes = {
  icon: PropTypes.string,
  iconColor: PropTypes.string.isRequired
}

export { BackButton, LeftButton, RightButton }
