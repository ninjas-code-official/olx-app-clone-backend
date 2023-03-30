import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useLayoutEffect, useState } from "react";
import { Platform, TouchableOpacity, View } from "react-native";
import MapView, { Circle, PROVIDER_DEFAULT, PROVIDER_GOOGLE } from "react-native-maps";
import CustomMarker from "../../../assets/SVG/imageComponents/CustomMarker";
import { TextDefault } from "../../../components";
import { colors, scale } from "../../../utilities";
import styles from "./styles";

const LATITUDE = 33.7001019;
const LONGITUDE = 72.9735978;
const LATITUDE_DELTA = 0.0022;
const LONGITUDE_DELTA = 0.0021;

function FullMap() {
  const navigation = useNavigation();
  const route = useRoute();
  const regions = route.params?.region ?? null;
  const title = route.params?.title ?? null;
  const latitude = route.params.latitude ?? LATITUDE;
  const longitude = route.params.longitude ?? LONGITUDE;
  const [mapMargin, setMapMargin] = useState(1);
  const [region, setRegion] = useState(
    regions ?? {
      latitude: latitude,
      latitudeDelta: LATITUDE_DELTA,
      longitude: longitude,
      longitudeDelta: LONGITUDE_DELTA,
    }
  );
  const backScreen = route.params.currentScreen ?? null;

  function setMargin() {
    setMapMargin(0);
  }
  function onSave() {
    if (backScreen === "LocationConfirm") {
      navigation.navigate("LocationConfirm", { regionChange: region });
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: title,
    });
  }, [navigation, route]);

  return (
    <View style={[styles.flex]}>
      <MapView
        style={{ marginTop: mapMargin, flex: 1 }}
        initialRegion={region}
        loadingEnabled={true}
        showsUserLocation={true}
        onRegionChangeComplete={backScreen && setRegion}
        onMapReady={setMargin}
        showsMyLocationButton={backScreen ? true : false}
        provider={Platform.select({
          ios: PROVIDER_DEFAULT,
          android: PROVIDER_GOOGLE,
        })}
        showsTraffic={false}
        region={region}
      >
        {backScreen !== "LocationConfirm" && (
          <Circle
            center={region}
            radius={scale(250)}
            strokeColor={"rgba(28, 115, 112, 0.9)"}
            fillColor={"rgba(28, 115, 112, 0.4)"}
          />
        )}
      </MapView>

      {backScreen === "LocationConfirm" && (
        <>
          <View
            style={{
              width: 50,
              height: 50,
              position: "absolute",
              top: "46%",
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
          <TouchableOpacity activeOpacity={0.7} style={styles.button} onPress={onSave}>
            <TextDefault textColor={colors.buttonText} H4 bold>
              Save
            </TextDefault>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}
export default React.memo(FullMap);
