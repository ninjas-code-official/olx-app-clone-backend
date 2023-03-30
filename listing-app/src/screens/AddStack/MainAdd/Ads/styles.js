import { StyleSheet } from 'react-native'
import { alignment, colors, scale } from '../../../../utilities'

const styles = StyleSheet.create({
    flex: {
        flex: 1
    },
    mainContainer: {
        backgroundColor: colors.themeBackground
    },
    emptyContainer: {
        backgroundColor: colors.containerBox,
        justifyContent: "center",
        alignItems: "center",
        ...alignment.PLmedium,
        ...alignment.PRmedium
    },
    emptyImage: {
        width: scale(150),
        height: scale(150)
    },
    smallContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.themeBackground,
        borderBottomColor: colors.horizontalLine,
        borderBottomWidth: StyleSheet.hairlineWidth,
        ...alignment.Pmedium
    },
    adContainer: {
        ...alignment.Msmall,
        backgroundColor: colors.containerBox,
        borderRadius: scale(5),
        borderLeftWidth: scale(3),
        shadowColor: colors.shadowColor,
        shadowOffset: {
            width: scale(0.5),
            height: scale(1)
        },
        shadowRadius: scale(1),
        shadowOpacity: 0.6,
        elevation: 5
    },
    dateRow: {
        backgroundColor: colors.bottomTabColor,
        width: "100%"
    },

    InfoContainer: {
        borderRadius: scale(5),
        height: scale(100),
        width: "100%",
        flexDirection: "row",
        ...alignment.Psmall,
        borderBottomColor: colors.horizontalLine,
        borderBottomWidth: StyleSheet.hairlineWidth
    },
    imgResponsive: {
        height: '100%',
        width: '30%'
    },
    descriptionContainer: {
        justifyContent: 'space-between',
        ...alignment.PLsmall,
    },
    locationRow: {
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
    },
    locationText: {
        flex: 1,
        ...alignment.PLxSmall,
        ...alignment.PRxSmall
    },
    Vline: {
        width: '40%',
        borderRightWidth: StyleSheet.hairlineWidth,
        borderRightColor: colors.fontMainColor,
        flexDirection: "row",
        ...alignment.MRlarge
    },
    statusContainer: {
        ...alignment.Psmall
    },
    statusBox: {
        width: scale(120),
        height: scale(30),
        borderRadius: scale(15),
        justifyContent: "center",
        alignItems: "center",
        ...alignment.PLxSmall,
        ...alignment.PRxSmall
    },
    activeStatus: {
        backgroundColor: colors.activeLine,
    },
    deactivateStatus: {
        backgroundColor: colors.google,
    },
    pendingStatus: {
        backgroundColor: colors.horizontalLine,
    },
    soldStatus: {
        backgroundColor: colors.selectedText,
    }
})
export default styles