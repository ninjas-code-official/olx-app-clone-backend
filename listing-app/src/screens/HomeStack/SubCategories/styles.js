import { StyleSheet } from "react-native"
import { alignment, colors, scale } from "../../../utilities"

const styles = StyleSheet.create({
    flex: {
        flex: 1,
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
    emptyContainer: {
        justifyContent: "center",
        alignItems: "center"
    },
    emptyImage: {
        width: scale(150),
        height: scale(150)
    },
    buttonView: {
        width: "90%",
        alignSelf: "center",
        ...alignment.PBsmall
    },
})
export default styles