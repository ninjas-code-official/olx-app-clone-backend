import { useNavigation } from '@react-navigation/native'
import React, { useState, useLayoutEffect } from 'react'
import { View, ActivityIndicator } from 'react-native'
import { WebView } from 'react-native-webview'

function HelpBrowser(props) {
  const navigation = useNavigation()
  const { title, url } = props.route.params
  const [loading, loadingSetter] = useState(true)

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerTitle: title
    })
  }, [navigation])

  return (
    <View style={{ flex: 1 }}>
      <WebView
        source={{ uri: url }}
        onLoad={() => {
          loadingSetter(false)
        }}
      />
      {loading ? (
        <ActivityIndicator
          style={{ position: 'absolute', bottom: '50%', left: '50%' }}
        />
      ) : null}
    </View>
  )
}

export default React.memo(HelpBrowser)
