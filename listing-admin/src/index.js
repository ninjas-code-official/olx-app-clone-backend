import React from 'react'
import ReactDOM from 'react-dom'
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloLink,
  Observable,
  split,
  concat,
  gql
} from '@apollo/client'
import { WebSocketLink } from '@apollo/client/link/ws'
import * as firebase from 'firebase/app'
import { LoadScript } from '@react-google-maps/api'
import 'firebase/messaging'
import 'assets/vendor/nucleo/css/nucleo.css'
import 'assets/vendor/@fortawesome/fontawesome-free/css/all.min.css'
import 'assets/scss/argon-dashboard-react.scss'
import { uploadToken } from '../src/apollo/server'

import { ws_server_url, server_url } from './config/config'
import App from './app'
import { getMainDefinition } from '@apollo/client/utilities'

const UPLOAD_TOKEN = gql`
  ${uploadToken}
`

const firebaseConfig = {
  apiKey: "AIzaSyA7UDOt-hkyTqT_54ZOoFpRicUcM7CvRoc",
  authDomain: "listing-app-51084.firebaseapp.com",
  databaseURL: "https://listing-app-51084.firebaseio.com",
  projectId: "listing-app-51084",
  storageBucket: "listing-app-51084.appspot.com",
  messagingSenderId: "531942178531",
  appId: "1:531942178531:web:a7e0017575cc8da40dcfd6",
  measurementId: "G-PMYT64D6Z7"
}

const cache = new InMemoryCache()
const httpLink = createHttpLink({
  uri: `${server_url}graphql`
})
const wsLink = new WebSocketLink({
  uri: `${ws_server_url}graphql`,
  options: {
    reconnect: true
  }
})

const request = async operation => {
  const data = localStorage.getItem('user-listing')
  let token = null
  if (data) {
    token = JSON.parse(data).token
  }
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : ''
    }
  })
}

const requestLink = new ApolloLink(
  (operation, forward) =>
    new Observable(observer => {
      console.log(observer)
      let handle
      Promise.resolve(operation)
        .then(oper => request(oper))
        .then(() => {
          handle = forward(operation).subscribe({
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer)
          })
        })
        .catch(observer.error.bind(observer))

      return () => {
        if (handle) handle.unsubscribe()
      }
    })
)

const terminatingLink = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  wsLink
  // httpLink,
)

const client = new ApolloClient({
  link: concat(ApolloLink.from([terminatingLink, requestLink]), httpLink),
  cache
})

// // Initialize Firebase
firebase.initializeApp(firebaseConfig)
const messaging = firebase.messaging()
messaging.usePublicVapidKey(
  'BFguDNZTD_pPlTz5c_lM2p0j13-xDwlN64PkNe0taBTbmeVwQ8MGclJgiZshzEgFzabtVexcR8O8TgnF9tBeYeE'
)
messaging
  .requestPermission()
  .then(function() {
    messaging
      .getToken()
      .then(function(currentToken) {
        if (currentToken) {
          client
            .mutate({
              mutation: UPLOAD_TOKEN,
              variables: { pushToken: currentToken }
            })
            .then(() => {})
            .catch(() => {})
        } else {
        }
      })
      .catch(function() {})
  })
  .catch(function() {})


ReactDOM.render(
  <ApolloProvider client={client}>
    <LoadScript
      id="script-loader"
      googleMapsApiKey="AIzaSyCzNP5qQql2a5y8lOoO-1yj1lj_tzjVImA">
    <App />
    </LoadScript>
  </ApolloProvider>,
  document.getElementById('root')
)