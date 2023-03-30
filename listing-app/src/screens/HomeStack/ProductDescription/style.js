import { ScalarLeafsRule } from 'graphql'
import { StyleSheet, Dimensions } from 'react-native'
import { alignment, colors, scale } from '../../../utilities'
const { height, width } = Dimensions.get('window')
const styles = StyleSheet.create({
    flex: {
        flex: 1
    },
    row: {
        flexDirection: 'row'
    },
    safeAreaview: {
        backgroundColor: colors.headerbackground,
    },
    mainContainer: {
        backgroundColor: colors.themeBackground,
    },
    contentContainer: {
        justifyContent: "center",
        alignItems: "center"
    },
    swiperContainer: {
        height: height * 0.4,
        position: 'relative'
    },
    headerView: {
        position: 'absolute',
        top: 0,
        height: height * 0.07,
        width: "100%",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'rgba(0, 46, 51, 0.3)',
    },
    iconPadding: {
        ...alignment.PLlarge,
        ...alignment.PRlarge
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },
    imageResponsive: {
        backgroundColor: colors.containerBox,
        width: scale(50),
        height: scale(50),
        borderRadius: scale(25),
        overflow: 'hidden'
    },
    iconResponsive: {
        backgroundColor: 'transparent',
        width: scale(25),
        height: scale(25)
    },
    image: {
        width: undefined,
        height: undefined,
        flex: 1,
        backgroundColor: 'transparent'
    },
    priceContainer: {
        width: '100%',
        ...alignment.PTlarge,
        ...alignment.PLlarge,
        ...alignment.PRlarge,
        ...alignment.PBmedium,
        borderBottomColor: colors.horizontalLine,
        borderBottomWidth: StyleSheet.hairlineWidth
    },
    priceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        ...alignment.MBxSmall
    },
    locationRow: {
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
        justifyContent: "space-between",
        ...alignment.PTxSmall
    },
    locationText: {
        flex: 1,
        ...alignment.PLxSmall,
        ...alignment.PRxSmall
    },
    conditionContainer: {
        width: '100%',
        ...alignment.PTlarge,
        ...alignment.PLlarge,
        ...alignment.PRlarge,
        ...alignment.PBmedium,
        borderBottomColor: colors.horizontalLine,
        borderBottomWidth: StyleSheet.hairlineWidth
    },
    profileContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        ...alignment.PTsmall,
        ...alignment.PBsmall,
        ...alignment.PLlarge,
        ...alignment.PRlarge,
        borderBottomColor: colors.horizontalLine,
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    profileInfo: {
        width: '70%',
        justifyContent: 'center'
    },
    buttonContainer: {
        height: scale(50),
        width: "100%",
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: "center",
        backgroundColor: colors.themeBackground,
        borderTopColor: colors.headerbackground,
        borderTopWidth: scale(3),
    },
    button: {
        backgroundColor: colors.buttonbackground,
        width: "31%",
        height: scale(40),
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: "center",
        borderRadius: scale(5)
    },
    line: {
        width: '100%',
        height: StyleSheet.hairlineWidth,
        backgroundColor: colors.horizontalLine
    },
    mapContainer: {
        flex: 1,
        height: scale(200),
        backgroundColor: 'transparent'
    },
    mapMarker: {
        height: scale(30),
        width: scale(30),
        borderRadius: scale(15),
        borderColor: 'rgba(28, 115, 112, 0.7)',
        borderWidth: 1,
        backgroundColor: 'rgba(28, 115, 112, 0.4)'
    }
})
export default styles