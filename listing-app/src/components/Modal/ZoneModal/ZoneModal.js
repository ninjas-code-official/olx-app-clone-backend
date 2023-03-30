import React from 'react';
import { Entypo } from '@expo/vector-icons';
import { FlatList, Modal, TouchableOpacity, View, KeyboardAvoidingView } from 'react-native';
import { useQuery, gql } from '@apollo/client'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { alignment, colors, scale } from '../../../utilities';
import ModalHeader from '../../Header/ModalHeader/ModalHeader';
import { TextDefault } from '../../Text';
import styles from './styles';
import { zones } from '../../../apollo/server'
import Spinner from '../../Spinner/Spinner';

const GET_ZONES = gql`${zones}`

function ZoneModal(props) {
    const inset = useSafeAreaInsets()
    const { data, error, loading } = useQuery(GET_ZONES)
   
    if (loading) {
        return <Spinner />
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={props.visible}
        >
            <SafeAreaView edges={['top', 'bottom']} style={[
                styles.safeAreaViewStyles,
                styles.flex]}>
                <KeyboardAvoidingView style={[styles.flex]}
                    behavior={Platform.OS === 'ios' ? 'padding' : null}
                >
                    <View style={[styles.flex, styles.mainContainer]}>
                        <ModalHeader  closeModal={props.onModalToggle} title={'Location'} />
                        <View style={styles.body}>
                            <TextDefault textColor={colors.fontSecondColor} uppercase style={styles.title}>
                                {'Choose State'}
                            </TextDefault>
                        </View>

                        {error ? <TextDefault>{error.message}</TextDefault> : <FlatList
                            contentContainerStyle={alignment.PBlarge}
                            showsVerticalScrollIndicator={false}
                            data={data.zones || []}
                            keyExtractor={(item) => item._id}
                            renderItem={({ item, index }) => (
                                <TouchableOpacity
                                    style={styles.stateBtn}
                                    onPress={() => {
                                        props.setZone({value:item._id, label: item.title})
                                        props.onModalToggle()
                                    }} >
                                    <TextDefault style={styles.flex} >
                                        {item.title}
                                    </TextDefault>
                                    {props.location?.value === item._id &&<Entypo name="check" size={scale(15)} color={colors.fontMainColor} />}
                                </TouchableOpacity>
                            )} />}
                    </View>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </Modal >
    )
}
export default React.memo(ZoneModal)