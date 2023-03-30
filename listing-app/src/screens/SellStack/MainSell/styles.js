import { StyleSheet, Dimensions } from "react-native"
import { alignment, colors, scale } from "../../../utilities"

const styles = StyleSheet.create({
    flex: {
        flex: 1
    },
    container: {
        backgroundColor: colors.themeBackground,
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    flatListContent: {
        flexGrow: 1,
        // backgroundColor:"orange",
        ...alignment.Plarge
    },
    mainContainer: {
        // backgroundColor: "yellow",
        justifyContent: "center",
        alignItems: 'center',
        width: '50%',
        height: scale(100)
    },
    borderStyle: {
        borderRightColor: colors.medHorizontalLine,
        borderRightWidth: scale(1)
    },
    imageView: {
        height: scale(30),
        width: scale(30),
        ...alignment.MBsmall
    },
    imgResponsive: {
        flex: 1,
        width: undefined,
        height: undefined
    },
    seperator: {
        height: scale(1),
        backgroundColor: colors.medHorizontalLine
    }
})
export default styles