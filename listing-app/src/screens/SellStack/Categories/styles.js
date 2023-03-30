import { StyleSheet } from "react-native"
import { alignment, colors, scale } from "../../../utilities"

const styles = StyleSheet.create({
    flex: {
        flex: 1,
    },
    spacer: {
        ...alignment.PTxSmall
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
    emptyContainer: {
        justifyContent: "center",
        alignItems: "center"
    },
    emptyImage: {
        width: scale(150),
        height: scale(150)
    },
    categoryContainer: {
        flexGrow: 1,
        ...alignment.PTmedium,
        ...alignment.PBlarge,
    },
    categoryRow: {
        height: scale(60),
        justifyContent: "center",
        alignItems: "center",
    },
    rowContainer: {
        width: "95%",
        height: "100%",
        flexDirection: 'row',
        alignItems: "center"
    },
    image: {
        width: scale(36),
        height: scale(36),
        backgroundColor: colors.containerBox,
        borderRadius: scale(18),
        padding: scale(7)
    },
    imgResponsive: {
        flex: 1,
        width: undefined,
        height: undefined
    },
    fontText: {
        flex: 1,
        ...alignment.PLlarge
    },
    rightIcon: {
        width: scale(25),
        alignItems: "flex-end"
    }
})
export default styles