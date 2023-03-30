import { Dimensions, StyleSheet } from 'react-native'
import { alignment, colors, scale } from '../../../utilities'
const { height } = Dimensions.get('window')

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.containerBox,
        borderWidth: StyleSheet.hairlineWidth * 2,
        borderColor: colors.buttonbackground,
        borderRadius: scale(5),
    },
    closeBtn: {
        justifyContent: "center",
        alignItems: "center",
        height: "85%",
        width: "10%"
    },
    textContainer: {
        flex: 1,
        ...alignment.PRxSmall,
    },
    inputText: {
        flex: 1,
        ...alignment.PLxSmall,
        ...alignment.PRxSmall
    },
})

export default styles