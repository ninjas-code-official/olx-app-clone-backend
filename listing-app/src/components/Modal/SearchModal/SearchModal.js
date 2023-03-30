import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Modal, SafeAreaView, TextInput, TouchableOpacity, View } from "react-native";
import { colors, scale } from "../../../utilities";
import { TextDefault } from "../../Text";
import styles from "./styles";

function SearchModal(props) {
  const [text, setText] = useState("");

  function navigate(item) {
    if (!!item) {
      props.setSearch(item);
    } else {
      //console.log(text)
      props.setSearch(text);
    }
    props.onModalToggle();
  }

  function header() {
    return (
      <View style={styles.headerContainer}>
        <View style={styles.headerContents}>
          <View style={styles.closeBtn}>
            <TouchableOpacity
              onPress={() => {
                props.onModalToggle();
              }}
              style={styles.backBtn}
            >
              <Ionicons name="ios-arrow-back" size={scale(23)} color={colors.headerText} />
            </TouchableOpacity>
            <TextInput
              style={styles.inputText}
              placeholderTextColor={colors.fontSecondColor}
              placeholder={"Find Cars, Mobile, Phone and more..."}
              value={text}
              onChange={(e) => {
                setText(e.nativeEvent.text);
              }}
            />
            <TouchableOpacity onPress={() => navigate()} style={styles.searchBtn}>
              <Ionicons name="ios-search" size={scale(20)} color={colors.white} />
            </TouchableOpacity>
          </View>
        </View>
        {/* <View style={styles.headerContents}>
                    <View style={styles.closeBtn}>
                        <TouchableOpacity
                            onPress={() => navigate()}
                            style={styles.backBtn}>
                            <SimpleLineIcons
                                name="location-pin"
                                size={scale(17)}
                                color={colors.headerText}
                            />
                        </TouchableOpacity>
                        <TextInput
                            style={styles.inputAddress}
                            placeholderTextColor={colors.fontSecondColor}
                            placeholder={'Search city, area or neighbour'}
                        />
                    </View>
                </View> */}
      </View>
    );
  }

  return (
    <Modal animationType="slide" transparent={true} visible={props.visible}>
      <SafeAreaView style={[styles.safeAreaViewStyles, styles.flex]}>
        <View style={[styles.flex, styles.mainContainer]}>
          {header()}
          <View style={styles.body}>
            <TextDefault textColor={colors.fontSecondColor} light uppercase>
              {"Popular categories"}
            </TextDefault>
            {props.categories.map((item, index) => (
              <TouchableOpacity onPress={() => navigate(item.title)} style={styles.category} key={index}>
                <Ionicons name="ios-search" size={scale(20)} color={colors.buttonbackground} />
                <TextDefault textColor={colors.fontSecondColor} H5 style={styles.fontText}>
                  {item.title}
                </TextDefault>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
}
export default React.memo(SearchModal);
