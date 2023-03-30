import React from "react";
import { colors, scale, textStyles } from "../utilities";
import {
  SimpleLineIcons,
  Fontisto,
  MaterialCommunityIcons,
  Ionicons,
  FontAwesome5,
  AntDesign,
} from "@expo/vector-icons";
import { BackButton } from "../components";
import { StyleSheet } from "react-native";

function StackOptions() {
  return {
    headerTitleAlign: "center",
    headerBackTitleVisible: false,
    headerStyle: {
      backgroundColor: colors.headerbackground,
      borderBottomColor: colors.horizontalLine,
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
    headerTitleContainerStyle: {
      marginLeft: scale(50),
    },
    headerTitleStyle: {
      color: colors.headerText,
      ...textStyles.H3,
      ...textStyles.Bold,
    },
    headerBackImage: () => BackButton({ iconColor: colors.headerText, icon: "leftArrow" }),
  };
}

function TopBarOptions() {
  return {
    activeTintColor: colors.fontMainColor,
    inactiveTintColor: colors.fontSecondColor,
    style: {
      backgroundColor: colors.headerbackground,
    },
    indicatorStyle: {
      backgroundColor: colors.buttonbackground,
      height: scale(2),
    },
  };
}

function tabOptions() {
  return {
    activeTintColor: colors.buttonbackground,
    inactiveTintColor: colors.fontSecondColor,
    keyboardHidesTabBar: true,
    tabStyle: {
      backgroundColor: colors.bottomTabColor,
      justifyContent: "center",
      alignItems: "center",
    },
    labelStyle: {
      ...textStyles.Bold,
      ...textStyles.UpperCase,
      justifyContent: "center",
    },
    style: {
      backgroundColor: colors.bottomTabColor,
    },
  };
}

function tabIcon(route) {
  return {
    tabBarIcon: ({ focused, color, size }) => {
      let icon;
      if (route.name === "Home") {
        focused
          ? (icon = <Fontisto name="home" size={scale(21)} color={color} />)
          : (icon = <SimpleLineIcons name="home" size={scale(21)} color={color} />);
      } else if (route.name === "Chat") {
        focused
          ? (icon = <MaterialCommunityIcons name="chat" size={scale(25)} color={color} />)
          : (icon = <SimpleLineIcons name="bubble" size={scale(20)} color={color} />);
      } else if (route.name === "Sell") {
        focused
          ? (icon = <AntDesign name="pluscircle" size={scale(22)} color={color} />)
          : (icon = <SimpleLineIcons name="plus" size={scale(22)} color={color} />);
      } else if (route.name === "Ads") {
        focused
          ? (icon = <AntDesign name="heart" size={scale(21)} color={color} />)
          : (icon = <SimpleLineIcons name="heart" size={scale(21)} color={color} />);
      } else if (route.name === "Account") {
        focused
          ? (icon = <FontAwesome5 name="user-alt" size={scale(25)} color={color} />)
          : (icon = <SimpleLineIcons name="user" size={scale(22)} color={color} />);
      }
      return icon;
    },
  };
}

export { tabOptions, tabIcon, TopBarOptions, StackOptions };
