import { StyleSheet } from 'react-native';
import { alignment, colors, scale } from '../../../utilities';

const styles = StyleSheet.create({
    flex: {
        flex: 1,
    },
    headerBackground: {
        height: scale(120),
        backgroundColor: colors.headerbackground,
        borderBottomColor: colors.horizontalLine,
        borderBottomWidth: StyleSheet.hairlineWidth,
        justifyContent: 'space-around',
        ...alignment.PLmedium,
        ...alignment.PRmedium,
        ...alignment.PBxSmall
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        height: scale(30)
    },
    title: {
        maxWidth: "75%",
        ...alignment.PLsmall,
        ...alignment.PRsmall
    },
    searchContainer: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    inputConainer: {
        width: "90%",
        borderWidth: StyleSheet.hairlineWidth * 2.5,
        borderRadius: scale(6),
        height: scale(35),
        alignItems: "center",
        flexDirection: "row",
        ...alignment.PLsmall,
        ...alignment.PRsmall,
        backgroundColor: colors.containerBox
    },
    searchBar: {
        ...alignment.PLmedium,
    },
    bellBtn: {
        flex: 1,
        height: '70%',
        justifyContent: "center",
        alignItems: "center",
    }
})
export default styles;