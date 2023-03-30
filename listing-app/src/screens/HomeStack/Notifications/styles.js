import { StyleSheet } from 'react-native'
import { colors, scale, alignment } from '../../../utilities'

const styles = StyleSheet.create({
    flex: {
        flex: 1,
    },
    container: {
        backgroundColor: colors.themeBackground,
        alignItems: 'center',
        justifyContent: 'center',
    },
    flatList: {
        width: "100%",
        backgroundColor: colors.themeBackground,
    },
    emptyContainer: {
        backgroundColor: colors.containerBox,
        justifyContent: "center",
        alignItems: "center"
    },
    emptyImage: {
        width: scale(150),
        height: scale(150)
    },
    notificationRow: {
        height: scale(50),
        justifyContent: "center",
        borderBottomColor: colors.fontThirdColor,
        borderBottomWidth: 1 
    },
    fontText: {
        width: "100%",
        ...alignment.PLsmall,
        ...alignment.PRsmall,
        ...alignment.PTsmall
    },
})

export default styles