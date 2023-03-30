import React from 'react'
import { View, Image } from 'react-native'
import Swiper from 'react-native-swiper'
import styles from './style'

function Slider(props) {
    return (
        <Swiper style={styles.wrapper} >
            {props.IMG_LIST.map((item, i) => (
                <View style={styles.slide} key={i}>
                    <Image
                        style={styles.image}
                        source={{uri:item}}
                        resizeMode='cover'
                        defaultSource={require('../../../assets/images/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png')}
                    />
                </View>
            ))}
        </Swiper>
    )
}
export default React.memo(Slider)