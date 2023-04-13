import { gql, useMutation } from "@apollo/client";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import * as AppAuth from "expo-app-auth";
import * as AuthSession from 'expo-auth-session'
import * as Google from 'expo-auth-session/providers/google'
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import React, { useContext, useState } from "react";
import { Image, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import getEnvVars from "../../../../environment";
import { login } from "../../../apollo/server";
import { FlashMessage, ModalHeader, TextDefault } from "../../../components";
import LoginButton from "../../../components/Buttons/LoginButton/LoginButton";
import UserContext from "../../../context/user";
import { colors } from "../../../utilities";
import styles from "./styles";

const LOGIN = gql`
  ${login}
`;

const { IOS_CLIENT_ID_GOOGLE, ANDROID_CLIENT_ID_GOOGLE } = getEnvVars();

const icon = require("../../../assets/Icon.png");

function Registration() {
  const navigation = useNavigation();
  const inset = useSafeAreaInsets();
  const [mutate] = useMutation(LOGIN, { onCompleted, onError });
  const { setTokenAsync } = useContext(UserContext);
  const [loginButton, setLoginButton] = useState(null);
  const [loading, setLoading] = useState(false);

  async function onCompleted(data) {
    if (data.login.isActive == false)
    {
      FlashMessage({
        message: "Can't Login, This Account is Deleted!",
        type: "warning",
        position: "top",
      });
    }
    else
    {
      try {
        await setTokenAsync(data.login.token);
        navigation.goBack();
      } catch (e) {
        //console.log(e)
      } finally {
        setLoading(false);
        setLoginButton(null);
      }
    }
    }
  //console.log("profile",profile)
  function onError(error) {
    try {
      //console.log('graphql', error.message)
      FlashMessage({
        message: error.message,
        type: "warning",
        position: "top",
      });
      setLoginButton(null);
    } catch (e) {
      //console.log(e)
    } finally {
      setLoading(false);
    }
  }

      const [  googleRequest,
        googleResponse,
        googlePromptAsync ]= Google.useAuthRequest({
        expoClientId: '850899622985-d7mvcllrk33husbd1srf5gd36aq7n9d5.apps.googleusercontent.com',
        iosClientId: IOS_CLIENT_ID_GOOGLE,
        androidClientId: ANDROID_CLIENT_ID_GOOGLE,
        iosStandaloneAppClientId: IOS_CLIENT_ID_GOOGLE,
        androidStandaloneAppClientId: ANDROID_CLIENT_ID_GOOGLE,
        redirectUrl: `${AuthSession.OAuthRedirect}:/oauth2redirect/google`,
        scopes: ["profile", "email"],
        })

  async function mutateLogin(user) {
    try {
      setLoading(true);
      let notificationToken = null;
      const { status: existingStatus } = await Notifications.requestPermissionsAsync();
      if (existingStatus === "granted") {
        notificationToken = (await Notifications.getExpoPushTokenAsync()).data;
      }
      mutate({ variables: { ...user, notificationToken } });
    } catch (e) {
      console.log(e);
    } finally {
    }
  }

  const googleSignUp = () => {
    if (googleResponse?.type === 'success') {
      const { authentication } = googleResponse
      ;(async () => {
        const userInfoResponse = await fetch(
          'https://www.googleapis.com/oauth2/v1/userinfo?alt=json',
          {
            headers: { Authorization: `Bearer ${authentication.accessToken}` }
          }
        )
        const googleUser = await userInfoResponse.json()
        const user = {
          phone: '',
          email: googleUser.email,
          password: '',
          name: googleUser.name,
          picture: googleUser.picture,
          type: 'google'
        }
        mutateLogin(user)
      })()
    }
  }

  useEffect(() => {
    googleSignUp()
  }, [googleResponse])



  return (
    <View style={[styles.safeAreaViewStyles, styles.flex, { paddingTop: inset.top, paddingBottom: inset.bottom }]}>
      <View style={[styles.flex, styles.mainContainer]}>
        <ModalHeader closeModal={() => navigation.goBack()} />
        <View style={styles.logoContainer}>
          <View style={styles.image}>
            <Image source={icon} style={styles.imgResponsive} resizeMode="contain" />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <LoginButton
            style={{ width: "85%" }}
            icon="social-google"
            title=" Continue with Gmail"
            loadingIcon={loading && loginButton === 'Google'}
            onPressIn={() => {
              setLoginButton('Google')
            }}
            disabled={!googleRequest}
            onPress={() => googlePromptAsync()}
          />
        </View>
        <View style={styles.footerContainer}>
          <TextDefault textColor={colors.fontPlaceholder} bold center small>
            {"If you Continue, you are accepting"}
          </TextDefault>
          <TextDefault textColor={colors.fontPlaceholder} bold center small style={{ textDecorationLine: "underline" }}>
            {"APP Terms and Conditions and Privacy Policy"}
          </TextDefault>
        </View>
      </View>
    </View>
  );
}

export default React.memo(Registration);
