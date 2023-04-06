import { gql, useQuery } from "@apollo/client";
import { Entypo, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { FlatList, KeyboardAvoidingView, Modal, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { zones } from "../../../apollo/server";
import { alignment, colors, scale } from "../../../utilities";
import ModalHeader from "../../Header/ModalHeader/ModalHeader";
import Spinner from "../../Spinner/Spinner";
import { TextDefault } from "../../Text";
import styles from "./styles";

const GET_ZONES = gql`
  ${zones}
`;

function LocationModal(props) {
  const inset = useSafeAreaInsets();
  const { data, error, loading } = useQuery(GET_ZONES);
  function btnLocation(zone) {
    console.log('zone',zone)
    props.setFilters({ zone: zone._id, title: zone.title, latitude: null, longitude: null });
    props.onModalToggle();
  }
  if (loading) {
    return <Spinner />;
  }

  async function storageLocation() {
    const locationStr = await AsyncStorage.getItem("location");
    const locationObj = JSON.parse(locationStr);
    if (locationObj) {
      const location = { title: locationObj.label, ...locationObj, zone: null };
      props.setFilters(location);
      props.onModalToggle();
    }
  }
  return (
    <Modal animationType="slide" transparent={true} visible={props.visible}>
      <SafeAreaView edges={["top", "bottom"]} style={[styles.safeAreaViewStyles, styles.flex]}>
        <KeyboardAvoidingView style={[styles.flex]} behavior={Platform.OS === "ios" ? "padding" : null}>
          <View style={[styles.flex, styles.mainContainer]}>
            <ModalHeader closeModal={props.onModalToggle} title={"Location"} />
            <View style={styles.body}>
              <View style={styles.headerContents}>
                <View style={styles.closeBtn}>
                  <TouchableOpacity
                    onPress={() => {
                      props.onModalToggle();
                    }}
                    style={styles.backBtn}
                  >
                    <Ionicons name="ios-search" size={scale(17)} color={colors.headerText} />
                  </TouchableOpacity>
                  <TextInput
                    style={styles.inputAddress}
                    placeholderTextColor={colors.fontSecondColor}
                    placeholder={"Search city, area or neighbour"}
                  />
                </View>
                <TouchableOpacity style={styles.currentLocation} onPress={() => storageLocation()}>
                  <MaterialCommunityIcons name="target" size={scale(25)} color={colors.spinnerColor} />
                  <View style={alignment.PLsmall}>
                    <TextDefault textColor={colors.spinnerColor} H5 bold>
                      {"Use current location"}
                    </TextDefault>
                    {loading && (
                      <TextDefault
                        numberOfLines={1}
                        textColor={colors.fontMainColor}
                        light
                        small
                        style={{ ...alignment.MTxSmall, width: "85%" }}
                      >
                        {"Fetching location..."}
                      </TextDefault>
                    )}
                  </View>
                </TouchableOpacity>
              </View>
              <TextDefault textColor={colors.fontSecondColor} uppercase style={styles.title}>
                {"Choose State"}
              </TextDefault>
            </View>

            {error ? (
              <TextDefault>{error.message}</TextDefault>
            ) : (
              <FlatList
                contentContainerStyle={alignment.PBlarge}
                showsVerticalScrollIndicator={false}
                data={data.zones || []}
                keyExtractor={(item) => item._id}
                renderItem={({ item, index }) => (
                  <TouchableOpacity style={styles.stateBtn} onPress={() => btnLocation(item)}>
                    <TextDefault style={styles.flex}>{item.title}</TextDefault>
                    <Entypo name="chevron-small-right" size={scale(20)} color={colors.fontMainColor} />
                  </TouchableOpacity>
                )}
              />
            )}
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Modal>
  );
}
export default React.memo(LocationModal);
