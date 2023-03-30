/*****************************
 * environment.js
 * path: '/environment.js' (root of your project)
 ******************************/

import Constants from 'expo-constants'

const ENV = {
  development: {
    GRAPHQL_URL: 'http://192.168.100.102:8003/graphql',
    WS_GRAPHQL_URL: 'ws://192.168.100.102:8003/graphql',
    SERVER_URL: 'http://192.168.100.102:8003/', // put / at the end of server url
    IOS_CLIENT_ID_GOOGLE:
      '531942178531-j7kd5f44m04nfmaf3b28hkfgc5lbp7q5.apps.googleusercontent.com',
    ANDROID_CLIENT_ID_GOOGLE:
      '531942178531-2fqgnlqbu3gkc1f1gc7l0ffihsj271ts.apps.googleusercontent.com',
    FACEBOOK_APP_ID: '404956210315749',
    CLOUDINARY_URL: 'https://api.cloudinary.com/v1_1/dox1npbbs/image/upload'
  },
  staging: {
    GRAPHQL_URL: 'https://listing.ninjascode.com/graphql',
    WS_GRAPHQL_URL: 'wss://listing.ninjascode.com/graphql',
    SERVER_URL: 'https://listing.ninjascode.com/', // put / at the end of server url
    IOS_CLIENT_ID_GOOGLE:
      '531942178531-j7kd5f44m04nfmaf3b28hkfgc5lbp7q5.apps.googleusercontent.com',
    ANDROID_CLIENT_ID_GOOGLE:
      '531942178531-2fqgnlqbu3gkc1f1gc7l0ffihsj271ts.apps.googleusercontent.com',
    FACEBOOK_APP_ID: '404956210315749',
    CLOUDINARY_URL: 'https://api.cloudinary.com/v1_1/dox1npbbs/image/upload'
  },
  production: {
    GRAPHQL_URL: 'https://listing.ninjascode.com/graphql',
    WS_GRAPHQL_URL: 'wss://listing.ninjascode.com/graphql',
    SERVER_URL: 'https://listing.ninjascode.com/', // put / at the end of server url
    IOS_CLIENT_ID_GOOGLE:
      '378663620953-btsp8b3g44tkclkqogobmp2r8t13v9vf.apps.googleusercontent.com',
    ANDROID_CLIENT_ID_GOOGLE:
      '378663620953-ocloim6fpl97fmu3tmcairgh5ju5flhl.apps.googleusercontent.com',
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