import React from 'react';
import { TouchableOpacity } from 'react-native';
import { colors } from '../../../utilities';
import styles from './styles';
import PropTypes from 'prop-types'
import { TextDefault } from '../../Text';
import Spinner from '../../Spinner/Spinner';

function EmptyButton(props) {

    return (
        <TouchableOpacity
            disabled={props.disabled ?? false}
            activeOpacity={0.7}
            style={[styles.emptyButton, { backgroundColor: props.disabled ? colors.disabled : colors.buttonbackground, }]}
            onPress={props.onPress}>
            {props.loading ? <Spinner spinnerColor={colors.white} backColor='transparent' /> : <TextDefault textColor={props.disabled ? colors.fontSecondColor : colors.buttonText} H4 bolder center>
                {props.title}
            </TextDefault>}
        </TouchableOpacity>
    )
}
EmptyButton.propTypes = {
    onPress: PropTypes.func,
    title: PropTypes.string.isRequired
}

export default React.memo(EmptyButton)