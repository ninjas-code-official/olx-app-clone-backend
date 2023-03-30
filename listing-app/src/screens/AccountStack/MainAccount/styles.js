import { StyleSheet } from "react-native"
import { alignment, colors, scale } from "../../../utilities"

const styles = StyleSheet.create({
    flex: {
        flex: 1,
    },
    container: {
        backgroundColor: colors.themeBackground,
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: colors.horizontalLine,
        borderBottomWidth: StyleSheet.hairlineWidth,
        ...alignment.Plarge
    },
    imageContainer: {
        backgroundColor: colors.containerBox,
        width: scale(90),
        height: scale(90),
        borderRadius: scale(45),
        overflow: 'hidden'
    },
    imgResponsive: {
        flex: 1,
        width: undefined,
        height: undefined
    },
    profileInfo: {
        ...alignment.PLmedium
    },
    font: {
        borderBottomColor: colors.fontMainColor,
        borderBottomWidth: StyleSheet.hairlineWidth
    },
    smallContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: colors.horizontalLine,
        borderBottomWidth: StyleSheet.hairlineWidth,
        ...alignment.Pmedium
    },
    loginBtn: {
        width: '90%',
        alignSelf: "center",
    }
})
export default styles