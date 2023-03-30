import { Entypo, FontAwesome, MaterialIcons, SimpleLineIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as Device from "expo-device";
import { useMutation, gql } from "@apollo/client";
import React, { useContext, useLayoutEffect, useState, useEffect } from "react";
import { Linking, Platform, ScrollView, Share, TouchableOpacity, View, Image } from "react-native";
import { BorderlessButton, RectButton } from "react-native-gesture-handler";
import MapView, { Circle, PROVIDER_DEFAULT, PROVIDER_GOOGLE } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
import moment from "moment";
import { FlashMessage, LeftButton, ReportModal, RightButton, TextDefault, Spinner } from "../../../components";
import UserContext from "../../../context/user";
import { addToFavourites } from "../../../apollo/server";
import ConfigurationContext from "../../../context/configuration";
import { alignment, colors, scale } from "../../../utilities";
import Slider from "./Slider";
import styles from "./style";

const ADD_TO_FAVOURITES = gql`
  ${addToFavourites}
`;

const mapIcon = require("../../../assets/icons/gMap.png");

const LATITUDE_DELTA = 0.0452;
const LONGITUDE_DELTA = 0.0451;

function linkToMapsApp({ latitude, longitude }) {
  const scheme = Platform.select({ ios: "maps:0,0?q=", android: "geo:0,0?q=" });
  const latLng = `${latitude},${longitude}`;
  const url = `${scheme}${latLng}`;

  Linking.openURL(url);
}

function ProductDescription(props) {
  const route = useRoute();
  const product = route.params?.product;
  const location = product?.address?.location?.coordinates;
  const { isLoggedIn, profile } = useContext(UserContext);
  const navigation = useNavigation();
  const [isLike, isLikeSetter] = useState(false);
  const [reportModal, setReportModal] = useState(false);
  const configuration = useContext(ConfigurationContext);
  const [mutate, { loading: loadingMutation }] = useMutation(ADD_TO_FAVOURITES);
  const region = {
    latitude: location ? Number(location[1]) : 0,
    latitudeDelta: LATITUDE_DELTA,
    longitude: location ? Number(location[0]) : 0,
    longitudeDelta: LONGITUDE_DELTA,
  };

  if (product === null) {
    navigation.goBack();
    return null;
  }

  useEffect(() => {
    if (isLoggedIn) {
      isLikeSetter(profile.likes ? !!profile.likes.find((like) => like._id === product._id) : false);
    } else {
      isLikeSetter(false);
    }
  }, [profile, isLoggedIn]);

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => null,
    });
  }, [navigation]);

  function toggleModal() {
    setReportModal((prev) => !prev);
  }

  async function share() {
    //console.log('share')
    try {
      const result = await Share.share({
        title: "App link",
        message: "Install this app and enjoy your friend community",
      });
      //console.log("Share Action", result.action, Share.sharedAction)
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
          FlashMessage({ message: "The invitation has been sent", type: "success" });
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      FlashMessage({ message: error.message, type: "warning" });
    }
  }

  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function dialCall() {
    if (!isLoggedIn) navigation.navigate("Registration");
    else if (!Device.isDevice)
      FlashMessage({ message: "This function is not working on Simulator/Emulator", type: "warning" });
    else {
      let phoneNumber = "";
      if (product.user.showPhone) {
        if (Platform.OS === "android") {
          phoneNumber = `tel:+${product.user.callingCode}${product.user.phone}`;
        } else {
          phoneNumber = `telprompt:+${product.user.callingCode}${product.user.phone}`;
        }

        Linking.openURL(phoneNumber);
      }
    }
  }

  function Sms() {
    if (!isLoggedIn) navigation.navigate("Registration");
    else if (product.user.showPhone) {
      let url = `sms:+${product.user.callingCode}${product.user.phone}${
        Platform.OS === "ios" ? "&" : "?"
      }body=${"This is sample text"}`;

      Linking.openURL(url);
    }
  }

  function getDate(date) {
    const formatDate = moment(+date).format("MMM YYYY");
    return formatDate;
  }
  return (
    <SafeAreaView style={[styles.flex, styles.safeAreaview]}>
      <ScrollView
        style={[styles.flex, styles.mainContainer]}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Modal */}
        <ReportModal visible={reportModal} onModalToggle={toggleModal} />

        <View style={styles.swiperContainer}>
          <Slider IMG_LIST={product.images} />
        </View>
        <View style={styles.priceContainer}>
          <View style={styles.priceRow}>
            <TextDefault H4 bold>
              {configuration.currencySymbol} {product.price}
            </TextDefault>
            <TouchableOpacity
              activeOpacity={0}
              onPress={() => {
                if (isLoggedIn) {
                  mutate({
                    variables: {
                      item: product._id,
                    },
                  });
                  isLikeSetter((prev) => !prev);
                } else {
                  navigation.navigate("Registration");
                }
              }}
            >
              {loadingMutation && (
                <Spinner size="small" spinnerColor={colors.spinnerColor1} backColor={"transparent"} />
              )}
              {isLike && !loadingMutation && <FontAwesome name="heart" size={scale(18)} color={colors.black} />}
              {!isLike && !loadingMutation && (
                <FontAwesome name="heart-o" size={scale(18)} color={colors.horizontalLine} />
              )}
            </TouchableOpacity>
          </View>
          <TextDefault>{product.title}</TextDefault>
          <View style={styles.locationRow}>
            <MaterialIcons name="location-on" size={scale(15)} color={colors.headerText} />
            <TextDefault numberOfLines={1} style={styles.locationText}>
              {product.address.address}
            </TextDefault>
            <TextDefault numberOfLines={1} uppercase>
              {getDate(product.createdAt)}
            </TextDefault>
          </View>
        </View>
        <View style={styles.conditionContainer}>
          <TextDefault bold H5 style={alignment.MBsmall}>
            {"Detail"}
          </TextDefault>
          <View style={styles.row}>
            <TextDefault uppercase light style={{ ...alignment.MBsmall, width: "35%" }}>
              {"Condition"}
            </TextDefault>
            <TextDefault bold style={alignment.MBsmall}>
              {capitalize(product.condition)}
            </TextDefault>
          </View>
        </View>
        <View style={styles.conditionContainer}>
          <TextDefault bold H5 style={alignment.MBsmall}>
            {"Description"}
          </TextDefault>
          <TextDefault>{product.description}</TextDefault>
        </View>
        <BorderlessButton
          borderless={false}
          style={styles.profileContainer}
          onPress={() => {
            if (profile._id != product.user._id) {
              navigation.navigate("UserProfile", { user: product.user._id });
            }
          }}
        >
          <View style={styles.imageResponsive}>
            <Image style={styles.image} source={require("../../../assets/images/avatar.png")} />
          </View>
          <View style={styles.profileInfo}>
            <TextDefault bold>{product.user.name}</TextDefault>
            <TextDefault light small>
              {`Member since ${getDate(product.user.createdAt)}`}
            </TextDefault>
            {profile && profile._id != product.user._id && (
              <TextDefault textColor={colors.spinnerColor} bold style={alignment.MTxSmall}>
                {"SEE Profile"}
              </TextDefault>
            )}
          </View>
          {profile && profile._id != product.user._id && (
            <Entypo name="chevron-small-right" size={scale(20)} color={colors.buttonbackground} />
          )}
        </BorderlessButton>
        <View style={styles.line} />
        <View style={styles.conditionContainer}>
          <TextDefault bold H5 style={alignment.MBsmall}>
            {"Ad posted at"}
          </TextDefault>
          <View style={styles.mapContainer}>
            <MapView
              style={styles.flex}
              scrollEnabled={false}
              zoomEnabled={false}
              zoomControlEnabled={false}
              rotateEnabled={false}
              showsUserLocation={false}
              provider={Platform.select({
                ios: PROVIDER_DEFAULT,
                android: PROVIDER_GOOGLE,
              })}
              initialRegion={region}
              onPress={() => {
                navigation.navigate("FullMap", {
                  title: product.title,
                  region: region,
                });
              }}
            >
              <Circle
                center={region}
                radius={scale(1000)}
                strokeColor={"rgba(28, 115, 112, 0.9)"}
                fillColor={"rgba(28, 115, 112, 0.4)"}
              />
            </MapView>
            <RectButton
              onPress={() => {
                linkToMapsApp(region);
              }}
              style={{
                width: scale(35),
                height: scale(35),
                position: "absolute",
                backgroundColor: colors.containerBox,
                bottom: 10,
                right: 10,
                zIndex: 0,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View style={styles.iconResponsive}>
                <Image source={mapIcon} style={styles.image} />
              </View>
            </RectButton>
          </View>
        </View>
        <View style={styles.profileContainer}>
          <TextDefault>{`AD ID: ${product.itemId}`}</TextDefault>
          <TouchableOpacity activeOpacity={0.7} onPress={() => toggleModal()}>
            <TextDefault textColor={colors.spinnerColor} uppercase bold>
              {"Report This AD"}
            </TextDefault>
          </TouchableOpacity>
        </View>

        {/* Header */}
        <View style={styles.headerView}>
          {LeftButton({ iconColor: colors.white, icon: "back" })}
          {RightButton({
            iconColor: colors.white,
            icon: "share",
            onPress: () => {
              share();
            },
          })}
        </View>
      </ScrollView>
      {/* Footer */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.button}
          onPress={() => navigation.navigate("Chat", { screen: "LiveChat", initial: false })}
        >
          <SimpleLineIcons name="bubble" size={scale(20)} color={colors.white} />
          <TextDefault textColor={colors.buttonText} uppercase bold style={alignment.PLsmall}>
            {"Chat"}
          </TextDefault>
        </TouchableOpacity>

        {product.user.showPhone && (
          <>
            <TouchableOpacity activeOpacity={0.7} style={styles.button} onPress={Sms}>
              <SimpleLineIcons name="envelope" size={scale(20)} color={colors.white} />
              <TextDefault textColor={colors.buttonText} uppercase bold style={alignment.PLsmall}>
                {"SMS"}
              </TextDefault>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.7} style={styles.button} onPress={dialCall}>
              <SimpleLineIcons name="phone" size={scale(20)} color={colors.white} />
              <TextDefault textColor={colors.buttonText} uppercase bold style={alignment.PLsmall}>
                {"CALL"}
              </TextDefault>
            </TouchableOpacity>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

export default React.memo(ProductDescription);
