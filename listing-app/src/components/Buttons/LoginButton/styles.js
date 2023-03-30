import { StyleSheet } from 'react-native'
import { alignment, colors, scale } from '../../../utilities'

const styles = StyleSheet.create({
    flex: {
        flex: 1
    },
    emptyButton: {
        width: '100%',
        height: scale(40),
        justifyContent: "center",
        alignItems: "center",
        flexDirection: 'row',
        backgroundColor: colors.themeBackground,
        borderRadius: scale(5),
        borderColor: colors.buttonbackground,
        borderWidth: scale(1),
        ...alignment.MBsmall,
        ...alignment.PLlarge,
        ...alignment.PRlarge
    },
})
export default styles