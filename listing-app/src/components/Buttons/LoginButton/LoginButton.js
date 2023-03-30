import React from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { alignment, colors, scale } from "../../../utilities";
import styles from "./styles";
import PropTypes from "prop-types";
import { TextDefault } from "../../Text";
import { SimpleLineIcons } from "@expo/vector-icons";
import Spinner from "../../Spinner/Spinner";

function LoginButton(props) {
  return (
    <TouchableOpacity
      disabled={props?.disabled ?? false}
      activeOpacity={0.7}
      style={StyleSheet.compose(styles.emptyButton, props.style)}
      onPressIn={props.onPressIn}
      onPress={props.onPress}
    >
      {props.loading && (
        <View>
          <Spinner />
        </View>
      )}
      {!props.loading && (
        <>
          {props.icon && <SimpleLineIcons name={props.icon} size={scale(20)} color={colors.buttonbackground} />}
          <TextDefault textColor={colors.buttonbackground} H4 style={alignment.PLxSmall}>
            {props.title}
          </TextDefault>
        </>
      )}
    </TouchableOpacity>
  );
}
LoginButton.propTypes = {
  onPress: PropTypes.func,
  onPressIn: PropTypes.func,
  title: PropTypes.string.isRequired,
};

export default React.memo(LoginButton);
