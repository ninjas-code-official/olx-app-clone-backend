import { StyleSheet } from "react-native";
import { alignment, colors } from '../../../utilities'

const styles = StyleSheet.create({
    flex: {
        flex: 1
    },
    mainContainer: {
        backgroundColor: colors.themeBackground,
    },
    safeAreaview: {
        backgroundColor: colors.bottomTabColor,
    },
    inputBorder: {
        flexDirection: "row",
        borderBottomWidth: 1,
        ...alignment.PBxSmall,
        ...alignment.Mlarge,
    },
    buttonView: {
        width: "90%",
        alignSelf: "center",
        ...alignment.PBsmall
    },
    leftText: {
        borderRightColor: colors.fontSecondColor,
        borderRightWidth: StyleSheet.hairlineWidth,
        justifyContent: "center",
        ...alignment.PRxSmall,
        ...alignment.MRmedium
    }
})
export default styles