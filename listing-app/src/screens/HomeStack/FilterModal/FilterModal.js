import { Ionicons } from "@expo/vector-icons";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import React, { useState } from "react";
import { Modal, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextDefault } from "../../../components";
import { colors, scale } from "../../../utilities";
import styles from "./styles";

const CONDITIONS = [
  {
    value: "",
    title: "Any",
  },
  {
    value: "new",
    title: "New",
  },
  {
    value: "used",
    title: "Used",
  },
];

const SORT = [
  {
    value: "latest",
    title: "Newly Listed",
  },
  {
    value: "priceLow",
    title: "Lowest Price",
  },
  {
    value: "priceHigh",
    title: "Highest Price",
  },
];

function FilterModal(props) {
  const [priceSliderValue, setPriceSliderValue] = useState([0, 50000]);
  const [condition, setCondition] = useState(CONDITIONS[0].value);
  const [sort, setSort] = useState(SORT[0].value);

  function priceSliderChange(values) {
    setPriceSliderValue(values);
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
              <Ionicons name="ios-arrow-back" size={scale(30)} color={colors.headerText} />
            </TouchableOpacity>
            <TextDefault H3 bold center style={styles.title}>
              {"Filter"}
            </TextDefault>
          </View>
        </View>
      </View>
    );
  }

  return (
    <Modal animationType="slide" transparent={true} visible={props.visible}>
      <SafeAreaView style={[styles.safeAreaViewStyles, styles.flex]}>
        <View style={[styles.flex, styles.mainContainer]}>
          {header()}
          <View style={styles.containerHead}>
            <View style={styles.subContainer}>
              <TextDefault H5 bold style={styles.width100}>
                {"Price"}
              </TextDefault>
              <View style={styles.subContainerRow}>
                <View style={[styles.priceFrom, styles.boxContainer]}>
                  <TextDefault numberOfLines={1} style={styles.limitPrice}>
                    {"Rs: "}
                    {priceSliderValue[0]}
                  </TextDefault>
                </View>
                <TextDefault light>{"to"}</TextDefault>
                <View style={[styles.priceFrom, styles.boxContainer]}>
                  <TextDefault style={styles.limitPrice}>
                    {"Rs: "}
                    {priceSliderValue[1]}
                  </TextDefault>
                </View>
              </View>
              <MultiSlider
                sliderLength={scale(310)}
                trackStyle={styles.trackStyle}
                markerStyle={styles.markerStyle}
                selectedStyle={styles.trackLine}
                values={[priceSliderValue[0], priceSliderValue[1]]}
                onValuesChange={priceSliderChange}
                min={0}
                max={50000}
                step={100}
                allowOverlap
                snapped
              />
            </View>
            <View style={styles.subContainer}>
              <TextDefault H5 bold style={styles.width100}>
                {"Condition"}
              </TextDefault>
              <View style={styles.subContainerRow}>
                {CONDITIONS.map((item, index) => (
                  <TouchableOpacity
                    key={item.value}
                    style={[
                      styles.conditionBox,
                      styles.boxContainer,
                      item.value === condition ? styles.selected : styles.notSelected,
                    ]}
                    onPress={() => setCondition(item.value)}
                  >
                    <TextDefault style={item.value === condition ? styles.selectedText : styles.unSelectedText}>
                      {item.title}
                    </TextDefault>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            <View style={styles.subContainer}>
              <TextDefault H5 bold style={styles.width100}>
                {"Sort"}
              </TextDefault>
              <ScrollView
                contentContainerStyle={styles.scrollviewContent}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                {SORT.map((item, index) => (
                  <TouchableOpacity
                    key={item.value}
                    style={[
                      styles.sortBox,
                      styles.boxContainer,
                      item.value === sort ? styles.selected : styles.notSelected,
                    ]}
                    onPress={() => setSort(item.value)}
                  >
                    <TextDefault style={item.value === sort ? styles.selectedText : styles.unSelectedText}>
                      {item.title}
                    </TextDefault>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
        </View>
        {/* Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.button}
            onPress={() => {
              let filter = {};
              filter.condition = condition;
              filter.min = priceSliderValue[0];
              filter.max = priceSliderValue[1];
              props.setFilter(filter);
              props.setSort(sort);
              props.onModalToggle();
            }}
          >
            <TextDefault textColor={colors.buttonText} uppercase bold>
              {"Apply"}
            </TextDefault>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  );
}
export default React.memo(FilterModal);
