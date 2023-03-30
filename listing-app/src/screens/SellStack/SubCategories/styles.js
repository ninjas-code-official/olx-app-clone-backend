import { StyleSheet } from "react-native"
import { alignment, colors, scale } from "../../../utilities"

const styles = StyleSheet.create({
    flex: {
        flex: 1,
    },
    safeAreaview: {
        backgroundColor: colors.bottomTabColor,
    },
    container: {
        backgroundColor: colors.themeBackground,
        alignItems: 'center',
        justifyContent: 'center',
    },
    flatList: {
        width: "100%",
        backgroundColor: colors.themeBackground,
    },
    categoryContainer: {
        flexGrow: 1,
        ...alignment.PTmedium,
        ...alignment.PBlarge,
    },
    categoryRow: {
        height: scale(45),
        justifyContent: "center",
    },
    fontText: {
        width: "100%",
        ...alignment.PLlarge,
        ...alignment.PRlarge
    },
    line: {
        borderBottomColor: colors.horizontalLine,
        borderBottomWidth: StyleSheet.hairlineWidth
    },
})
export default styles