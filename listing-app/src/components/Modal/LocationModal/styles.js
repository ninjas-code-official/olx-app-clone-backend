
import { StyleSheet } from 'react-native'
import { alignment, colors, scale } from '../../../utilities'

const styles = StyleSheet.create({
    flex: {
        flex: 1
    },
    safeAreaViewStyles: {
        backgroundColor: colors.headerbackground
    },
    mainContainer: {
        backgroundColor: colors.themeBackground
    },
    body: {
        ...alignment.PTsmall,
    },
    headerContents: {
        width: "95%",
        alignItems: "center",
        justifyContent: 'center',
        alignSelf: "center"
    },
    closeBtn: {
        width: "100%",
        borderWidth: StyleSheet.hairlineWidth * 2,
        borderRadius: scale(5),
        height: scale(35),
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: colors.containerBox,
        overflow: "hidden"
    },
    backBtn: {
        height: "100%",
        height: "100%",
        width: "10%",
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputAddress: {
        width: "90%",
        ...alignment.PLxSmall,
        ...alignment.PRxSmall
    },
    currentLocation: {
        width: "100%",
        flexDirection: 'row',
        alignItems: "center",
        ...alignment.MTlarge
    },
    title: {
        backgroundColor: colors.headerbackground,
        ...alignment.MTmedium,
        ...alignment.PLmedium,
        ...alignment.PTxSmall,
        ...alignment.PBxSmall
    },
    stateBtn: {
        flexDirection: "row",
        alignItems:'center',
        borderBottomColor: colors.horizontalLine,
        borderBottomWidth: StyleSheet.hairlineWidth,
        ...alignment.Psmall
    }
})

export default styles