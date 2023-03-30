import { StyleSheet } from 'react-native'
import { alignment, colors, scale } from '../../../utilities'

const styles = StyleSheet.create({
    emptyButton: {
        width: '100%',
        height: scale(40),
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.themeBackground,
        borderRadius: scale(5),
        borderColor: colors.buttonbackground,
        borderWidth: scale(1),
        ...alignment.MTlarge
    },
})
export default styles