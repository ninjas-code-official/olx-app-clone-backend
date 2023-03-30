// import { StyleSheet } from "react-native";
// import { alignment, colors } from '../../../utilities'

// const styles = StyleSheet.create({
//     flex: {
//         flex: 1
//     },
//     mainContainer: {
//         backgroundColor: colors.themeBackground,
//         justifyContent: "space-between"
//     },
//     safeAreaview: {
//         backgroundColor: colors.bottomTabColor,
//     },
//     inputBorder: {
//         flexDirection: "row",
//         borderBottomWidth: StyleSheet.hairlineWidth,
//         ...alignment.PBxSmall,
//         ...alignment.Mlarge,
//     },
//     buttonView: {
//         width: "90%",
//         alignSelf: "center",
//         ...alignment.PBsmall
//     },
//     leftText: {
//         borderRightColor: colors.fontSecondColor,
//         borderRightWidth: StyleSheet.hairlineWidth,
//         ...alignment.PRxSmall,
//         ...alignment.MRmedium
//     },
//     smallContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         borderBottomColor: colors.horizontalLine,
//         borderBottomWidth: StyleSheet.hairlineWidth,
//         ...alignment.Pmedium
//     },
// })
// export default styles


import { verticalScale, scale, colors, fontStyles, alignment } from '../../../utilities'
import { Dimensions, Platform, StatusBar } from 'react-native'
const { height, width } = Dimensions.get('window')


export default {
    flex: {
        flex: 1
    },
    subContainer: {
        flex: 1,
        alignItems: 'center',
        paddingTop: scale(20),
        justifyContent: 'space-between',
    },
    upperContainer: {
        width: '90%',
        alignItems: 'center',
    },
    addressContainer: {
        padding: scale(10),
        paddingTop: 0,
        width: '100%',
    },
    labelButtonContainer: {
        padding: scale(5),
        width: '100%',
    },
    labelTitleContainer: {
        paddingTop: scale(10),
        paddingBottom: scale(10),
    },
    labelText: {
        fontFamily: fontStyles.MuseoSans700,
        fontSize: scale(14)
    },
    buttonInline: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    labelButton: {
        width: '30%',
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 30,
        padding: scale(5),
        justifyContent: 'center',
    },
    labelButtonText: {
        fontFamily: fontStyles.MuseoSans500,
        fontSize: scale(12),
        textAlign: 'center',
    },
    activeLabel: {
        width: '30%',
        borderWidth: 1,
        borderRadius: 30,
        padding: scale(5),
        justifyContent: 'center',
        color: colors.colorPrimary100,
        borderColor: colors.colorPrimary100,
    },
    activeButtonText: {
        fontFamily: fontStyles.MuseoSans500,
        fontSize: scale(12),
        textAlign: 'center',
        color: colors.colorPrimary100
    },
    saveBtnContainer: {
        width: '100%',
        height: verticalScale(40),
        justifyContent: "center",
        alignItems: 'center',
        alignSelf: 'flex-end',
        backgroundColor: colors.primaryOrangeColor,
    },
    saveBtnText: {
        color: colors.colorPrimary500,
        fontFamily: fontStyles.MuseoSans500,
        fontSize: scale(16)
    },
    fakeMarkerContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        marginLeft: -24,
        marginTop: -58,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    marker: {
        height: 48,
        width: 48
    },
    mapContainer: {
        height: '40%',
        backgroundColor: 'black',
    },
    alertboxRed: {
        marginTop: Platform.OS === 'ios' ? height * 0.1 : (height * 0.1) - (StatusBar.currentHeight),
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "rgba(0, 0, 0, 0.3)",
        shadowOffset: {
            width: 0,
            height: 6
        },
    },
    alertboxGreen: {
        backgroundColor: 'rgba(49,169,96,0.85)',
        marginTop: Platform.OS === 'ios' ? height * 0.1 : (height * 0.1) - (StatusBar.currentHeight),
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "rgba(0, 0, 0, 0.3)",
        shadowOffset: {
            width: 0,
            height: 6
        },
    },
        buttonView: {
        width: "90%",
        alignSelf: "center",
        ...alignment.PBsmall
    },
}