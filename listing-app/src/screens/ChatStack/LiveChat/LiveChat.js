import { useNavigation } from '@react-navigation/native'
import React, { useLayoutEffect, useState } from 'react'
import { Platform, View, KeyboardAvoidingView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LiveHeader } from '../../../components'
import styles from './styles'
import { GiftedChat } from 'react-native-gifted-chat';

function LiveChat() {
    const navigation = useNavigation()

    useLayoutEffect(() => {
        navigation.setOptions({
            header: () => <LiveHeader />
        })
    }, [navigation])

    const [messages, setMessages] = useState([
        /**
         * Mock message data
         */
        // example of system message
        {
            _id: 0,
            text: 'New room created.',
            createdAt: new Date().getTime(),
            system: true
        },
        // example of chat message
        {
            _id: 1,
            text: 'Hello!',
            createdAt: new Date().getTime(),
            user: {
                _id: 2,
                name: 'Saad Javed'
            }
        }
    ]);

    // helper method that is sends a message
    function handleSend(newMessage = []) {
        setMessages(GiftedChat.append(messages, newMessage));
    }

    return (
        <SafeAreaView edges={['left', 'right']} style={[styles.flex, styles.safeAreaViewStyles,]}>
            <View style={[styles.flex, styles.mainContainer]}>
                <GiftedChat
                    messages={messages}
                    onSend={newMessage => handleSend(newMessage)}
                    user={{ _id: 1, name: 'Sharan Gohar' }}
                    showUserAvatar
                />
            </View>

        </SafeAreaView>
    )
}

export default React.memo(LiveChat)