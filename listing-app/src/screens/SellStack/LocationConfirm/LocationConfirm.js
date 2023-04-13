import { gql, useMutation } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions, useNavigation, useRoute } from "@react-navigation/native";
import * as Location from "expo-location";
import * as Permission from "expo-permissions";
import React, { useContext, useEffect, useRef, useState } from "react";
import { KeyboardAvoidingView, ScrollView, View } from "react-native";
import MapView, { PROVIDER_DEFAULT, PROVIDER_GOOGLE } from "react-native-maps";
import { OutlinedTextField } from "react-native-material-textfield";
import { SafeAreaView } from "react-native-safe-area-context";
import getEnvir from "../../../../environment";
import { createAd, editAd } from "../../../apollo/server";
import CustomMarker from "../../../assets/SVG/imageComponents/CustomMarker";
import { EmptyButton, FlashMessage, TextDefault } from "../../../components";
import UserContext from "../../../context/user";
import { fontStyles, scale, verticalScale } from "../../../utilities";
import styles from "./styles";

const { CLOUDINARY_URL } = getEnvir();
const CLOUDINARY_ADS = "azqr6fp4";
const CREATE_AD = gql`
  ${createAd}
`;
const EDIT_AD = gql`
  ${editAd}
`;

const label_values = [
  {
    title: "Home",
    value: "Home",
  },
  {
    title: "Work",
    value: "Work",
  },
  {
    title: "Other",
    value: "Other",
  },
];

const LATITUDE = 33.7001019;
const LONGITUDE = 72.9735978;
const LATITUDE_DELTA = 0.0022;
const LONGITUDE_DELTA = 0.0021;

function LocationConfirm() {
  const addressRef = useRef();
  const [delivery_address, setDeliveryAddress] = useState("");
  const [loader, setLoader] = useState(false);
  const [delivery_address_error, setDeliveryAddressError] = useState(null);
  const { profile } = useContext(UserContext);
  const [formData, setFormData] = useState(null);
  const [mutation, setMutation] = useState(CREATE_AD);
  const [locLoading, setLocLoading] = useState(true);
  const [region, setRegion] = useState({
    latitude: LATITUDE,
    latitudeDelta: LATITUDE_DELTA,
    longitude: LONGITUDE,
    longitudeDelta: LONGITUDE_DELTA,
  });

  const [mutate, { error, data }] = useMutation(mutation, {
    onCompleted,
    onError,
  });

  function onCompleted({ createItem, editItem }) {
    console.log('on complete');
    setLoader(false);
    const item = createItem || editItem;
    AsyncStorage.removeItem("formData");

    if (editItem) {
      navigation.dispatch((state) => {
        return CommonActions.reset({
          state: {
            ...state,
            routeNames: ["Ads"],
          },
          routes: [{ name: "MainAds" }],
          index: 0,
        });
      });
    }
    if (createItem) {
      navigation.dispatch((state) => {
        return CommonActions.reset({
          state: {
            ...state,
            routeNames: ["Sell"],
          },
          routes: [{ name: "Sell" }],
          index: 0,
        });
      });
    }
    navigation.navigate("Home", { screen: "AdPosting", params: { item: item } });
  }

  function onError(error) {
    console.log("Error" + error)
  }

  useEffect(() => {
    didFocus();
  }, []);

  async function didFocus() {
    const formStr = await AsyncStorage.getItem("formData");
    const formObj = JSON.parse(formStr);
    console.log('formObj', formObj)
    setMutation(formObj.editStatus ? EDIT_AD : CREATE_AD);
    setFormData(formObj);
  }

  useEffect(() => {
    _getLocationAsync();
  }, []);
  const navigation = useNavigation();
  const route = useRoute();
  const regionObj = route.params ? route.params.regionChange : null;

  useEffect(() => {
    navigation.setOptions({
      title: "Confirm your location",
    });
  }, []);

  const uploadImageToCloudinary = async (image) => {
    if (image === "") {
      return image;
    }
    const apiUrl = CLOUDINARY_URL;
    const data = {
      file: image,
      upload_preset: CLOUDINARY_ADS,
    };
    try {
      const result = await fetch(apiUrl, {
        body: JSON.stringify(data),
        headers: {
          "content-type": "application/json",
        },
        method: "POST",
      });
      const imageData = await result.json();
      // //console.log('imageData', imageData)
      return imageData.secure_url;
    } catch (e) {
      //console.log(e)
    }
  };

  useEffect(() => {
    if (regionObj !== null) regionChange(regionObj);
  }, [regionObj]);

  async function _getLocationAsync() {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status === "granted") {
      let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
      let loc = {
        latitude: parseFloat(location.coords.latitude),
        latitudeDelta: LATITUDE_DELTA,
        longitude: parseFloat(location.coords.longitude),
        longitudeDelta: LONGITUDE_DELTA,
      };
      setRegion(loc);
      setLocLoading(false);
      regionChange(loc);
    } else {
      FlashMessage({
        message: "Location permission not granted",
      });
    }
  }

  function regionChange(region) {
    Location.reverseGeocodeAsync({ ...region })
      .then((data) => {
        if (data.length && addressRef.current !== null) {
          const location = data[0];
          const deliveryAddress = Object.keys(location)
            .map((key) => location[key])
            .join(" ");
          setDeliveryAddress(deliveryAddress);
          setRegion(region);

          addressRef.current.setValue(deliveryAddress);
        }
      })
      .catch((error) => {
        //console.log(error)
      });
  }

  if (error) {
    // return <TextError text={error.message} />
    return <TextDefault>{JSON.stringify(error)}</TextDefault>;
  }

  return (
    <SafeAreaView edges={["bottom"]} style={[styles.flex, styles.safeAreaview]}>
      {/* <View style={[styles.flex, styles.mainContainer]}> */}
      {/* <View style={styles.smallContainer}> */}
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.flex}>
        <View style={[styles.flex, styles.mainContainer]}>
          <View style={styles.mapContainer}>
            <MapView
              style={{ flex: 1 }}
              scrollEnabled={false}
              zoomEnabled={false}
              zoomControlEnabled={false}
              rotateEnabled={false}
              cacheEnabled={true}
              initialRegion={{
                latitude: LATITUDE,
                latitudeDelta: LATITUDE_DELTA,
                longitude: LONGITUDE,
                longitudeDelta: LONGITUDE_DELTA,
              }}
              region={region}
              provider={Platform.OS === "android" ? PROVIDER_GOOGLE : PROVIDER_DEFAULT}
              onPress={() => {
                navigation.navigate("FullMap", {
                  latitude: region.latitude,
                  longitude: region.longitude,
                  currentScreen: "LocationConfirm",
                  title: "Map",
                });
              }}
            ></MapView>
            <View
              style={{
                width: 50,
                height: 50,
                position: "absolute",
                top: "50%",
                left: "50%",
                zIndex: 1,
                translateX: -25,
                translateY: -25,
                justifyContent: "center",
                alignItems: "center",
                transform: [{ translateX: -25 }, { translateY: -25 }],
              }}
            >
              <CustomMarker width={40} height={40} transform={[{ translateY: -20 }]} translateY={-20} />
            </View>
          </View>
          <ScrollView style={styles.flex} contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.subContainer}>
              <View style={styles.upperContainer}>
                <View style={styles.addressContainer}>
                  <OutlinedTextField
                    clearButtonMode="always"
                    error={delivery_address_error}
                    ref={addressRef}
                    value={delivery_address}
                    label={"Full Delivery Address"}
                    labelFontSize={scale(12)}
                    fontSize={scale(12)}
                    baseColor="rgb(0, 0, 0)"
                    maxLength={100}
                    labelOffset={{ y1: -5 }}
                    tintColor={!delivery_address_error ? "rgb(255, 85, 10)" : "red"}
                    labelTextStyle={{ fontFamily: fontStyles.MuseoSans300, fontSize: scale(12), paddingTop: scale(1) }}
                    onChangeText={(text) => {
                      setDeliveryAddress(text);
                    }}
                    onBlur={() => {
                      setDeliveryAddressError(!delivery_address.trim().length ? "Delivery address is required" : null);
                    }}
                  />
                  <View style={{ marginTop: verticalScale(20) }}></View>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
      {/* </View> */}

      <View style={styles.buttonView}>
        {!delivery_address ? (
          <EmptyButton
            loading={locLoading}
            disabled={!locLoading}
            title={formData?.editStatus ? "Update Ad" : "Save Ad"}
          />
        ) : (
          <EmptyButton
            loading={loader}
            title={formData?.editStatus ? "Update Ad" : "Save Ad"}
            onPress={async () => {
              setLoader(true);
              let imageUrl = formData.image;
              if (formData.newImage) {
                imageUrl = await uploadImageToCloudinary(formData.image);
              }
              const address = {
                latitude: region.latitude.toString(),
                longitude: region.longitude.toString(),
                address: delivery_address,
              };
              if (!!formData) { 
                console.log(formData.location.value);               
                mutate({
                  variables: {
                    item: {
                      _id: formData.id,
                      zone: formData.location.value,
                      user: profile._id,
                      address: address,
                      images: [imageUrl],
                      title: formData.title,
                      description: formData.description,
                      condition: formData.condition,
                      subCategory: formData.subCategory,
                      price: Number(formData.price),
                    },
                  },
                });
              }
            }}
          />
        )}
      </View>

      {/* </View> */}
    </SafeAreaView>
  );
}
export default React.memo(LocationConfirm);
