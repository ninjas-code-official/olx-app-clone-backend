import {
  Roboto_100Thin,
  Roboto_300Light,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { BackHandler } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FlashMessage from "react-native-flash-message";
import * as Permissions from "expo-permissions";
import * as Notifications from "expo-notifications";
import { ApolloProvider } from "@apollo/client";
import { UserProvider } from "./src/context/user";
import { ConfigurationProvider } from "./src/context/configuration";
import AppContainer from "./src/routes";
import { colors } from "./src/utilities";
import setupApolloClient from "./src/apollo/index";
import { LocationContext } from "./src/context/Location";
import { exitAlert } from "./src/utilities/androidBackButton";

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [location, setLocation] = useState(null);
  const [client, setupClient] = useState(null);
  const [fontLoaded, setFontLoaded] = useState(false);

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

  useEffect(() => {
    (async () => {
      try {
        await SplashScreen.preventAutoHideAsync();
      } catch (e) {
        console.warn(e);
      }
      loadAppData();
    })();

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", exitAlert);
    };
  }, []);

  useEffect(() => {
    if (!appIsReady) return;
    (async () => {
      await SplashScreen.hideAsync();
    })();
  }, [appIsReady]);

  useEffect(() => {
    if (!location) return;
    (async () => {
      let locationObj = JSON.stringify({ ...location, label: "Current Location" });
      AsyncStorage.setItem("location", locationObj);
    })();
  }, [location]);

  async function loadAppData() {
    const client = await setupApolloClient();
    setupClient(client);
    await Font.loadAsync({
      Thin: Roboto_100Thin,
      Light: Roboto_300Light,
      Regular: Roboto_400Regular,
      Bold: Roboto_500Medium,
      Bolder: Roboto_700Bold,
    });
    await permissionForPushNotificationsAsync();
    setFontLoaded(true);
    await getActiveLocation();
    BackHandler.addEventListener("hardwareBackPress", exitAlert);

    setAppIsReady(true);
  }

  async function getActiveLocation() {
    try {
      const locationStr = await AsyncStorage.getItem("location");
      if (locationStr) {
        setLocation(JSON.parse(locationStr));
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function permissionForPushNotificationsAsync() {
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;
    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== "granted") {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    // Stop here if the user did not grant permissions
    if (finalStatus !== "granted") {
      return;
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }
  }

  if (appIsReady) {
    return (
      <ApolloProvider client={client}>
        <LocationContext.Provider value={{ location, setLocation }}>
          <ConfigurationProvider>
            <UserProvider>
              <AppContainer />
              <StatusBar style="dark" backgroundColor={colors.buttonbackground} />
              <FlashMessage position="top" />
            </UserProvider>
          </ConfigurationProvider>
        </LocationContext.Provider>
      </ApolloProvider>
    );
  } else {
    return (
      <></>
      // <AppLoading />
    );
  }
}
