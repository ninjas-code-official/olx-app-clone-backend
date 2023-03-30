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
        ...alignment.PTsmall
    },
    stateBtn: {
        flexDirection: "row",
        alignItems: 'center',
        ...alignment.Psmall
    },
    font: {
        ...alignment.PLlarge
    },
    footerView: {
        ...alignment.Pmedium
    },
    textInput: {
        borderBottomColor: colors.buttonbackground,
        borderBottomWidth: StyleSheet.hairlineWidth,
        ...alignment.PLxSmall,
        ...alignment.PRxSmall,
        ...alignment.PBxSmall
    },
    buttonsRow: {
        flexDirection: "row",
        justifyContent: "flex-end",
        ...alignment.PTsmall
    },
    button: {
        ...alignment.PTmedium,
        ...alignment.PLlarge,
        ...alignment.MLsmall
    },
    buttonText: {
        borderBottomColor: colors.buttonbackground,
        borderBottomWidth: 2,
        ...alignment.PBxSmall,
    }
})

export default styles