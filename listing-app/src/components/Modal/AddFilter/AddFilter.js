import React from "react";
import { FlatList, Modal, SafeAreaView, TouchableOpacity, View } from "react-native";
import ModalHeader from "../../Header/ModalHeader/ModalHeader";
import { TextDefault } from "../../Text";
import styles from "./styles";

const OPTIONS = [
  {
    value: "ALL",
    title: "View all",
  },
  {
    value: "ACTIVE",
    title: "Active Ads",
  },
  {
    value: "INACTIVE",
    title: "Inactive Ads",
  },
  {
    value: "PENDING",
    title: "Pending Ads",
  },
];

function AddFilter({ visible, onModalToggle, setFilter }) {
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <SafeAreaView style={[styles.safeAreaViewStyles, styles.flex]}>
        <View style={[styles.flex, styles.mainContainer]}>
          <ModalHeader closeModal={onModalToggle} title={"Filters"} />
          <FlatList
            data={OPTIONS}
            contentContainerStyle={{ flexGrow: 1 }}
            style={styles.body}
            ItemSeparatorComponent={() => <View style={styles.seperator} />}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                style={styles.stateBtn}
                onPress={() => {
                  onModalToggle();
                  setFilter(item);
                }}
              >
                <TextDefault style={[styles.flex, styles.font]} H5>
                  {item.title}
                </TextDefault>
              </TouchableOpacity>
            )}
          />
        </View>
      </SafeAreaView>
    </Modal>
  );
}
export default React.memo(AddFilter);
