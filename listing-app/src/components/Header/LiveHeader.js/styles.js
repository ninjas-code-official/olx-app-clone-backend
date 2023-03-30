import { Dimensions, StyleSheet } from 'react-native'
import { alignment, colors, scale } from '../../../utilities'
const { height } = Dimensions.get('window')

const styles = StyleSheet.create({
    flex: {
        flex: 1
    },
    safeAreaContainer: {
        backgroundColor: colors.headerbackground
    },
    titleContainer: {
        height: "100%",
        flexDirection: "row",
        alignItems: "center",
    },
    headerContainer: {
        width: '100%',
        height: height * 0.07,
        backgroundColor: colors.headerbackground,
        borderBottomWidth: StyleSheet.hairlineWidth,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: colors.horizontalLine
    },
    headerContents: {
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    imageResponsive: {
        height: '90%',
        width: scale(50),
    },
    img: {
        width: undefined,
        height: undefined,
        borderRadius: scale(5),
    },
    profileImg: {
        position: 'absolute',
        width: scale(24),
        height: scale(24),
        borderRadius: scale(12),
        bottom: 5,
        right: -10
    },
    infoContainer: {
        height: "100%",
        flex: 1,
        justifyContent: "space-around",
        ...alignment.PLmedium,
        ...alignment.PRmedium
    },
    iconContainer: {
        height: "100%",
        width: '35%',
        justifyContent: "space-around",
        alignItems: "center",
        flexDirection: "row",
    },
})

export default styles