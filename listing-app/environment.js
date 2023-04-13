/*****************************
 * environment.js
 * path: '/environment.js' (root of your project)
 ******************************/

import Constants from 'expo-constants'

const ENV = {
  development: {
    GRAPHQL_URL: 'https://listing.up.railway.app/graphql',
    WS_GRAPHQL_URL: 'wss://https://listing.up.railway.app/graphql',
    SERVER_URL: 'https://listing.up.railway.app/', // put / at the end of server url
    IOS_CLIENT_ID_GOOGLE:
    '850899622985-oa7knqkj2ki7ue2hbliluallq2jc3vjh.apps.googleusercontent.com',
    ANDROID_CLIENT_ID_GOOGLE:
    '850899622985-6tqr67i5r652nhol1ek57s36av3jas65.apps.googleusercontent.com',
    CLOUDINARY_URL: 'https://api.cloudinary.com/v1_1/dox1npbbs/image/upload',
    
  },
  staging: {
    GRAPHQL_URL: 'https://listing.up.railway.app/graphql',
    WS_GRAPHQL_URL: 'wss://https://listing.up.railway.app/graphql',
    SERVER_URL: 'https://listing.up.railway.app/', // put / at the end of server url
    IOS_CLIENT_ID_GOOGLE:
    '850899622985-oa7knqkj2ki7ue2hbliluallq2jc3vjh.apps.googleusercontent.com',
    ANDROID_CLIENT_ID_GOOGLE:
    '850899622985-6tqr67i5r652nhol1ek57s36av3jas65.apps.googleusercontent.com',
    FACEBOOK_APP_ID: '404956210315749',
    CLOUDINARY_URL: 'https://api.cloudinary.com/v1_1/dox1npbbs/image/upload'
  },
  production: {
    GRAPHQL_URL: 'https://listing.up.railway.app/graphql',
    WS_GRAPHQL_URL: 'wss://https://listing.up.railway.app/graphql',
    SERVER_URL: 'https://listing.up.railway.app/', // put / at the end of server url
    IOS_CLIENT_ID_GOOGLE:
    '850899622985-oa7knqkj2ki7ue2hbliluallq2jc3vjh.apps.googleusercontent.com',
    ANDROID_CLIENT_ID_GOOGLE:
    '850899622985-6tqr67i5r652nhol1ek57s36av3jas65.apps.googleusercontent.com',
    CLOUDINARY_URL: 'https://api.cloudinary.com/v1_1/dox1npbbs/image/upload'
  }
}

const getEnvVars = (env = Constants.manifest.releaseChannel) => {
  // What is __DEV__ ?
  // This variable is set to true when react-native is running in Dev mode.
  // __DEV__ is true when run locally, but false when published.
  if (__DEV__) {
    return ENV.development
  } else if (env === 'production') {
    return ENV.production
  } else if (env === 'staging') {
    return ENV.staging
  } else {
    return ENV.staging
  }
}

export default getEnvVars