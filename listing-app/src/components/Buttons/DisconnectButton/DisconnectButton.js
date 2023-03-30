import React from 'react';
import { TouchableOpacity } from 'react-native';
import { colors } from '../../../utilities';
import styles from './styles';
import PropTypes from 'prop-types'
import { TextDefault } from '../../Text';

function DisconnectButton(props) {

    return (
        <TouchableOpacity
            disabled={props.disabled ?? false}
            activeOpacity={0.7}
            style={[styles.emptyButton]}
            onPress={props.onPress}>
            <TextDefault textColor={colors.buttonbackground} H4 bolder center>
                {props.title}
            </TextDefault>
        </TouchableOpacity>
    )
}
DisconnectButton.propTypes = {
    onPress: PropTypes.func,
    title: PropTypes.string.isRequired
}

export default React.memo(DisconnectButton)