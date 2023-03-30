import { AntDesign, Entypo, FontAwesome5, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useContext } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { EmptyButton, TextDefault } from '../../../components';
import UserContext from '../../../context/user';
import { alignment, colors, scale } from '../../../utilities';
import styles from './styles';

function MainAccount() {
    const navigation = useNavigation()
    const { isLoggedIn, profile } = useContext(UserContext)

    return (
        <View style={[styles.flex, styles.container]}>
            <View style={styles.profileContainer}>
                <View style={styles.imageContainer}>
                    <Image
                        style={styles.imgResponsive}
                        source={require('../../../assets/images/avatar.png')}
                        resizeMode='cover'
                    />
                </View>
                <View style={[styles.flex, styles.profileInfo]}>
                    <TextDefault H4 bold style={alignment.MBmedium}>
                        {isLoggedIn ? profile.name : 'Log in'}
                    </TextDefault>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        style={alignment.PBxSmall}
                        onPress={() =>
                            isLoggedIn ?
                                navigation.navigate('Profile')
                                :
                                navigation.navigate('Registration')
                        }
                    >
                        <TextDefault textColor={colors.spinnerColor} H5 bold>
                            {isLoggedIn ? 'View and edit profile' : 'Log in to your account'}
                        </TextDefault>
                    </TouchableOpacity>
                </View>
            </View>
            {isLoggedIn && <>
                <TouchableOpacity style={styles.smallContainer} onPress={() => navigation.navigate('Network')}>
                    <FontAwesome5 name="users" size={scale(20)} color={colors.buttonbackground} />
                    <View style={[styles.flex]}>
                        <TextDefault bold H5 style={alignment.PLlarge}>
                            {'My Network'}
                        </TextDefault>
                        <TextDefault light style={[alignment.PLlarge, alignment.MTxSmall]}>
                            {'Followers, following and find friends'}
                        </TextDefault>
                    </View>
                    <Entypo name="chevron-small-right" size={scale(30)} color={colors.buttonbackground} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.smallContainer} onPress={() => navigation.navigate('Settings')}>
                    <AntDesign name="setting" size={scale(22)} color={colors.buttonbackground} />
                    <View style={[styles.flex]}>
                        <TextDefault bold H5 style={alignment.PLlarge}>
                            {'Settings'}
                        </TextDefault>
                        <TextDefault light style={[alignment.PLlarge, alignment.MTxSmall]}>
                            {'Privacy and logout'}
                        </TextDefault>
                    </View>
                    <Entypo name="chevron-small-right" size={scale(30)} color={colors.buttonbackground} />
                </TouchableOpacity>
            </>
            }
            <TouchableOpacity style={styles.smallContainer} onPress={() => navigation.navigate('Help')}>
                <Ionicons name="ios-help-circle-outline" size={scale(22)} color={colors.buttonbackground} />
                <View style={[styles.flex]}>
                    <TextDefault bold H5 style={alignment.PLlarge}>
                        {'Help and Support'}
                    </TextDefault>
                    <TextDefault light style={[alignment.PLlarge, alignment.MTxSmall]}>
                        {'Help center, Terms and conditions, Privacy policy'}
                    </TextDefault>
                </View>
                <Entypo name="chevron-small-right" size={scale(30)} color={colors.buttonbackground} />
            </TouchableOpacity>
            {!isLoggedIn && <View style={styles.loginBtn}>
                <EmptyButton
                    title='Login or register'
                    onPress={() => navigation.navigate('Registration')} />
            </View>}
        </View >
    );
}

export default MainAccount
