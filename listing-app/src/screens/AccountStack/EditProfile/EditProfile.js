import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useLayoutEffect, useState, useContext } from "react";
import { gql, useMutation } from "@apollo/client";
import {
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import { LeftButton, RightButton, TextDefault, Spinner, FlashMessage } from "../../../components";
import { alignment, colors, scale } from "../../../utilities";
import { updateUser } from "../../../apollo/server";
import styles from "./styles";
import { Entypo, Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import UserContext from "../../../context/user";
import { SafeAreaView } from "react-native-safe-area-context";

const UPDATE_USER = gql`
  ${updateUser}
`;

const IMAGE_PLACEHOLDER = require("../../../assets/images/avatar.png");

function EditProfile() {
  const navigation = useNavigation();
  const route = useRoute();
  const { profile } = useContext(UserContext);
  const [adColor, setAdColor] = useState(colors.fontThirdColor);
  const [descriptionColor, setDescriptionColor] = useState(colors.fontMainColor);
  const [name, setName] = useState(profile.name);
  const [description, setDescription] = useState(profile.description ?? "");
  const [nameError, setNameError] = useState(null);
  const [phoneError, setPhoneError] = useState(null);
  const [margin, marginSetter] = useState(false);
  const [image, setImage] = useState(null);
  const [mutate, { loading }] = useMutation(UPDATE_USER, { onError, onCompleted });

  function onCompleted(data) {
    FlashMessage({ message: "Profile Updated!" });
  }

  function onError(error) {
    //console.log('edit profile error', JSON.stringify(error))
  }

  const PHONE_DATA = {
    number: profile.phone ?? "",
    callingCode: profile.callingCode ?? "92",
    countryCode: profile.countryCode ?? "PK",
    showPhone: profile.showPhone ?? false,
  };

  const phoneData = route.params && route.params.phoneData ? route.params.phoneData : PHONE_DATA;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: null,
      headerLeft: () => <LeftButton icon="close" iconColor={colors.headerText} />,
      headerRight: () =>
        loading ? (
          <View {...alignment.PRlarge}>
            <Spinner size="small" spinnerColor={colors.spinnerColor1} backColor={"transparent"} />
          </View>
        ) : (
          <RightButton
            iconColor={colors.headerText}
            icon="text"
            title={"Save"}
            onPress={() => {
              if (validation) {
                mutate({
                  variables: {
                    userInput: {
                      name,
                      description,
                      countryCode: phoneData.countryCode,
                      callingCode: phoneData.callingCode,
                      phone: phoneData.number,
                      showPhone: phoneData.showPhone,
                    },
                  },
                });
              }
            }}
          />
        ),
    });
  }, [navigation, phoneData, loading]);

  useEffect(() => {
    if (!(phoneData.number.length <= 13 && phoneData.number.length >= 9)) setPhoneError("Phone Number is missing");
    else setPhoneError(null);
  }, [phoneData]);

  function validation() {
    let result = true;
    if (name.length < 1) {
      setNameError("This is mandatory. Please complete the required field.");
      result = false;
    }
    if (!(phoneData.number.length <= 13 && phoneData.number.length >= 9)) {
      setPhoneError("Phone Number must be between 9-13");
      result = false;
    }
    //console.log('Res: ', result)
    return result;
  }

  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
    Keyboard.addListener("keyboardDidHide", _keyboardDidHide);

    // cleanup function
    return () => {
      Keyboard.removeAllListeners("keyboardDidShow", _keyboardDidShow);
      Keyboard.removeAllListeners("keyboardDidHide", _keyboardDidHide);
    };
  }, []);
  function _keyboardDidShow() {
    marginSetter(true);
  }
  function _keyboardDidHide() {
    marginSetter(false);
  }
  return (
    <SafeAreaView edges={["bottom"]} style={[styles.flex, styles.safeAreaView]}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null} style={styles.flex}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          style={styles.flex}
          alwaysBounceVertical={false}
          contentContainerStyle={{
            flexGrow: 1,
            backgroundColor: colors.themeBackground,
            paddingBottom: Platform.OS === "ios" ? (margin ? scale(70) : 0) : 0,
          }}
        >
          <View style={styles.flex}>
            <View style={styles.basicInfoContainer}>
              <TextDefault textColor={colors.fontMainColor} bold H4 style={alignment.MTlarge}>
                {"Basic information"}
              </TextDefault>
              <View style={styles.upperContainer}>
                <View activeOpacity={1} style={styles.imageContainer}>
                  <Image style={styles.imgResponsive} source={IMAGE_PLACEHOLDER} resizeMode="cover" />
                </View>
                <View style={[styles.subContainer, styles.flex]}>
                  <TextDefault textColor={nameError ? colors.google : adColor} bold style={styles.width100}>
                    {"Enter Name "}
                    <TextDefault textColor={colors.errorColor}>{"*"}</TextDefault>
                  </TextDefault>
                  <View style={[styles.textContainer, { borderColor: adColor }]}>
                    <TextInput
                      style={styles.inputText}
                      onFocus={() => {
                        setNameError(null);
                        setAdColor(colors.selectedText);
                      }}
                      defaultValue={name}
                      onBlur={() => setAdColor(colors.fontThirdColor)}
                      onChangeText={(text) => setName(text)}
                      placeholderTextColor={colors.fontThirdColor}
                      placeholder={"Enter your name"}
                    />
                  </View>
                  {nameError && (
                    <TextDefault textColor={colors.google} style={styles.width100}>
                      {nameError}
                    </TextDefault>
                  )}
                </View>
              </View>
              <View style={styles.subContainer}>
                <TextDefault textColor={descriptionColor} bold style={styles.width100}>
                  {"Description"}
                </TextDefault>
                <View style={[styles.descriptionContainer, { borderColor: descriptionColor }]}>
                  <TextInput
                    style={styles.inputText}
                    maxLength={140}
                    multiline={true}
                    onFocus={() => {
                      setDescriptionColor(colors.selectedText);
                    }}
                    defaultValue={description}
                    onBlur={() => setDescriptionColor(colors.fontMainColor)}
                    onChangeText={(text) => setDescription(text)}
                    placeholderTextColor={colors.fontSecondColor}
                    placeholder={"Something about you"}
                  />
                </View>
                <TextDefault light small right style={alignment.MTxSmall}>
                  {description.length + "/ 140"}
                </TextDefault>
              </View>
            </View>

            <View style={styles.basicInfoContainer}>
              <TextDefault textColor={colors.fontMainColor} bold H4>
                {"Contact information"}
              </TextDefault>
              <TouchableOpacity
                activeOpacity={1}
                style={styles.phoneRow}
                onPress={() => navigation.navigate("EditPhone", { phoneData: phoneData })}
              >
                <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
                  <View style={styles.countryBox}>
                    <TextDefault textColor={colors.fontThirdColor}>{"Country"}</TextDefault>
                    <TextDefault H5 style={[alignment.PBxSmall, alignment.PTxSmall]}>
                      {`+${phoneData.callingCode}`}
                    </TextDefault>
                  </View>
                  <View style={styles.numberBox}>
                    <View>
                      <TextDefault textColor={phoneError ? colors.errorColor : colors.fontThirdColor}>
                        {phoneData.number.length < 1 ? "" : "Phone Number"}
                      </TextDefault>
                      <TextDefault
                        textColor={phoneData.number.length < 1 ? colors.fontThirdColor : colors.fontMainColor}
                        H5
                        style={[alignment.PBxSmall, alignment.PTxSmall]}
                      >
                        {phoneData.number.length < 1 ? "Phone Number" : phoneData.number}
                      </TextDefault>
                    </View>
                    <Entypo name="chevron-small-right" size={scale(25)} color={colors.fontMainColor} />
                  </View>
                </View>
                {phoneError && (
                  <TextDefault textColor={colors.google} style={styles.error}>
                    {phoneError}
                  </TextDefault>
                )}
              </TouchableOpacity>
              <View style={styles.emailBox}>
                <TextDefault textColor={colors.fontThirdColor}>{profile.email.length < 1 ? "" : "Email"}</TextDefault>
                <TextDefault
                  textColor={profile.email.length < 1 ? colors.fontThirdColor : colors.fontSecondColor}
                  H5
                  style={[alignment.PBxSmall, alignment.PTxSmall]}
                >
                  {profile.email}
                </TextDefault>
              </View>
              <TextDefault textColor={colors.fontSecondColor} style={[alignment.MTxSmall, alignment.MBsmall]}>
                {"This email will be useful to keep in touch. We won't share your private email with other APP users."}
              </TextDefault>
            </View>
            {/* <View style={styles.basicInfoContainer}>
                            <TextDefault textColor={colors.fontMainColor} bold H4>
                                {'Optional information'}
                            </TextDefault>
                            <TouchableOpacity
                                activeOpacity={1}
                                style={styles.phoneRow}>
                                <View style={styles.optionalLeft}>
                                    <TextDefault textColor={colors.fontMainColor} H5 style={alignment.MBsmall}>
                                        {'Facebook'}
                                    </TextDefault>
                                    <TextDefault textColor={colors.fontSecondColor} style={[alignment.PBxSmall, alignment.PTxSmall]}>
                                        {'Sign in with Facebook and discover your trusted connections to buyers'}
                                    </TextDefault>
                                </View>
                                <View style={styles.optionalRight}>
                                    {!profile.facebookId ? <EmptyButton
                                        title='Connect'
                                        onPress={() => navigation.goBack()} />:
                                        <DisconnectButton
                                        title='Disconnect'
                                        onPress={() => navigation.goBack()} />}
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                activeOpacity={1}
                                style={styles.phoneRow}>
                                <View style={styles.optionalLeft}>
                                    <TextDefault textColor={colors.fontMainColor} H5 style={alignment.MBsmall}>
                                        {'Google'}
                                    </TextDefault>
                                    <TextDefault textColor={colors.fontSecondColor} style={[alignment.PBxSmall, alignment.PTxSmall]}>
                                        {'Connect your APP account to your Google account for simplicity and ease.'}
                                    </TextDefault>
                                </View>
                                <View style={styles.optionalRight}>
                                {!profile.googleEmail ? <EmptyButton
                                        title='Connect'
                                        onPress={() => navigation.goBack()} />:
                                        <DisconnectButton
                                        title='Disconnect'
                                        onPress={() => navigation.goBack()} />}
                                </View>
                            </TouchableOpacity>
                        </View> */}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default React.memo(EditProfile);
