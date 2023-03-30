import { alignment, colors, scale, textStyles } from "../../../utilities";

const { StyleSheet } = require("react-native");

const styles = StyleSheet.create({
    flex: {
        flex: 1
    },
    width100: {
        width: "100%",
    },
    safeAreaview: {
        backgroundColor: colors.bottomTabColor,
    },
    mainContainer: {
        backgroundColor: colors.themeBackground,
        // alignItems: "center"
    },
    subContainer: {
        ...alignment.Psmall,
    },
    locationContainer:{
        ...alignment.Psmall,
    },
    line: {
        borderBottomColor: colors.horizontalLine,
        borderBottomWidth: StyleSheet.hairlineWidth
    },
    subContainerRow: {
        width: "95%",
        flexDirection: 'row',
        alignItems: "center",
        ...alignment.PTsmall,
        ...alignment.PBsmall
    },
    conditionBox: {
        width: '30%',
        height: scale(35),
        ...alignment.MRsmall
    },
    boxContainer: {
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: scale(5),
        alignItems: "center",
        justifyContent: "center"
    },
    notSelected: {
        backgroundColor: colors.themeBackground,
        borderColor: colors.buttonbackground
    },
    selected: {
        backgroundColor: colors.selected,
        borderColor: colors.selectedText
    },
    unSelectedText: {
        color: colors.fontMainColor,
    },
    selectedText: {
        color: colors.selectedText,
        ...textStyles.Bold
    },
    scrollviewContent: {
        alignItems: "center",
        ...alignment.PTsmall,
        ...alignment.PBsmall
    },
    typeBox: {
        width: scale(100),
        height: scale(35),
        ...alignment.PLsmall,
        ...alignment.PRsmall,
        ...alignment.MRsmall
    },
    textContainer: {
        backgroundColor: colors.themeBackground,
        borderWidth: StyleSheet.hairlineWidth * 2,
        borderRadius: scale(5),
        height: scale(40),
        ...alignment.MTsmall
    },
    descriptionContainer: {
        backgroundColor: colors.themeBackground,
        borderWidth: StyleSheet.hairlineWidth * 2,
        borderRadius: scale(5),
        height: scale(70),
        ...alignment.MTsmall
    },
    locationOptionContainer: {
        backgroundColor: colors.themeBackground,
        borderWidth: StyleSheet.hairlineWidth * 2,
        borderRadius: scale(50),
        height: scale(80),
        
        
    },
    locationItemStyle: {
        borderBottomColor: colors.headerbackground,
        borderBottomWidth: 1,
        ...alignment.PTmedium,
        ...alignment.PBmedium
    },
    inputText: {
        flex: 1,
        ...textStyles.H4,
        ...alignment.PLsmall,
        ...alignment.PRsmall
    },
    inputConainer: {
        flexDirection: "row",
        alignItems:'center',
        backgroundColor: colors.themeBackground,
        borderWidth: StyleSheet.hairlineWidth * 2,
        borderRadius: scale(5),
        ...alignment.Psmall,
        ...alignment.MTsmall
    },
    buttonView: {
        width: "90%",
        alignSelf: "center",
        ...alignment.PBsmall
    }
})

export default styles;