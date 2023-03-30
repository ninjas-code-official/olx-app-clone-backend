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
        justifyContent: 'center',
        ...alignment.Psmall
    },
    seperator: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: colors.horizontalLine
    },
    font: {
        ...alignment.PLsmall
    },
})

export default styles