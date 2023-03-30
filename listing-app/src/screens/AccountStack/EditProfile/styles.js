import { StyleSheet } from 'react-native'
import { alignment, colors, scale, textStyles } from '../../../utilities'

const styles = StyleSheet.create({
    flex: {
        flex: 1
    },
    width100: {
        width: "100%",
    },
    safeAreaView: {
        backgroundColor: colors.headerbackground
    },
    mainContainer: {
        backgroundColor: colors.themeBackground
    },
    basicInfoContainer: {
        ...alignment.PTlarge,
        ...alignment.PLmedium,
        ...alignment.PRmedium,
        borderBottomColor: colors.medHorizontalLine,
        // borderBottomWidth: StyleSheet.hairlineWidth
    },
    upperContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    imageContainer: {
        backgroundColor: colors.containerBox,
        width: scale(90),
        height: scale(90),
        borderRadius: scale(45),
        overflow: 'hidden'
    },
    imgResponsive: {
        flex: 1,
        width: undefined,
        height: undefined
    },
    subContainer: {
        ...alignment.PLsmall,
        ...alignment.PBsmall,
        ...alignment.PTsmall
    },
    textContainer: {
        backgroundColor: colors.themeBackground,
        borderWidth: StyleSheet.hairlineWidth * 2,
        borderRadius: scale(5),
        height: scale(35),
        ...alignment.MTxSmall
    },
    descriptionContainer: {
        backgroundColor: colors.themeBackground,
        borderWidth: StyleSheet.hairlineWidth * 2,
        borderRadius: scale(5),
        height: scale(50),
        ...alignment.MTsmall
    },
    inputText: {
        flex: 1,
        ...textStyles.H5,
        ...alignment.PLsmall,
        ...alignment.PRsmall
    },
    phoneRow: {
        ...alignment.MTsmall,
        ...alignment.MBsmall
    },
    countryBox: {
        width: "20%",
        borderBottomColor: colors.horizontalLine,
        borderBottomWidth: scale(1)
    },
    numberBox: {
        width: "70%",
        borderBottomColor: colors.horizontalLine,
        borderBottomWidth: scale(1),
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "space-between"
    },
    emailBox: {
        width: "100%",
        borderBottomColor: colors.horizontalLine,
        borderBottomWidth: scale(1),
        ...alignment.MTsmall
    },
    optionalLeft: {
        width: '60%',
        // ...alignment.PTmedium,
        // ...alignment.PBmedium
    },
    optionalRight: {
        width: "35%"
    },
    error: {
        width: "70%",
        alignSelf: "flex-end"
    }
})

export default styles