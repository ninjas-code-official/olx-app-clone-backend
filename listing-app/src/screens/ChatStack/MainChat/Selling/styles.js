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
})
export default styles