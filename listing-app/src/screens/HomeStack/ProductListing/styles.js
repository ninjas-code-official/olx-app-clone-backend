import { alignment, colors, scale } from "../../../utilities";

const { StyleSheet } = require("react-native");

const styles = StyleSheet.create({
    flex: {
        flex: 1
    },
    spacer: {
        height: scale(15)
    },
    mainContainer: {
        backgroundColor: colors.themeBackground,
        ...alignment.PTsmall,
        ...alignment.PBsmall,
        ...alignment.PLxSmall,
        ...alignment.PRxSmall
    },
    headingRow: {
        ...alignment.PTxSmall,
        ...alignment.PBxSmall,
        ...alignment.MBmedium,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    filterBtn: {
        borderWidth: scale(1),
        width: scale(65),
        borderColor: colors.buttonbackground,
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center",
        ...alignment.PxSmall
    },
    fontText: {
        flex: 1,
    },
    searchCard: {
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: colors.buttonbackground,
        borderRadius: scale(5),
        height: scale(110),
        width: "100%",
        flexDirection: "row",
        ...alignment.Psmall
    },
    imgResponsive: {
        height: '100%',
        width: '30%'
    },
    descriptionContainer: {
        ...alignment.PLsmall
    },
    likeRow: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    likeContainer: {
        width: "25%",
        alignItems: "flex-end"
    },
    featured: {
        backgroundColor: colors.feature,
        justifyContent: "center",
        ...alignment.PLsmall,
        ...alignment.PRsmall
    },
    infoContainer: {
        justifyContent: "space-between",
        ...alignment.PTxSmall
    },
    locationRow: {
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
        justifyContent:"space-between",
    },
    locationText: {
        flex: 1,
        ...alignment.PLxSmall,
        ...alignment.PRxSmall
    },
    emptyContainer: {
        backgroundColor: colors.containerBox,
        justifyContent: "center",
        alignItems: "center"
    },
    emptyImage: {
        width: scale(150),
        height: scale(150)
    },
})
export default styles