import { StyleSheet } from 'react-native'
import { alignment, colors } from '../../../utilities'

const styles = StyleSheet.create({
    flex: {
        flex: 1
    },
    mainContainer: {
        backgroundColor: colors.themeBackground
    },
    smallContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: colors.horizontalLine,
        borderBottomWidth: StyleSheet.hairlineWidth,
        ...alignment.Psmall
    }
})
export default styles