import { alignment, colors, scale } from "../../../utilities";

const { StyleSheet, Dimensions } = require("react-native");
const { height } = Dimensions.get('window')

const styles = StyleSheet.create({
    flex: {
        flex: 1,
    },
    safeAreaViewStyles: {
        backgroundColor: colors.headerbackground
    },
    mainContainer: {
        backgroundColor: colors.themeBackground
    },
    logoContainer: {
        height: height * 0.4,
        backgroundColor: colors.selectedText,
        justifyContent: 'center',
        alignItems: "center",
        ...alignment.Plarge
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: "center",
        backgroundColor: colors.themeBackground,
        ...alignment.Plarge
    },
    imgResponsive: {
        height: scale(60),
        width: scale(60),
        ...alignment.MBlarge
    },
    img: {
        height: undefined,
        width: undefined,
        flex: 1
    },
    imgContainer: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
    }
})
export default styles