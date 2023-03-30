import { alignment, colors, scale } from "../../../utilities";
import { Dimensions } from 'react-native'
const { height } = Dimensions.get('window')

const { StyleSheet } = require("react-native");

const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: colors.imageHeader,
        height: height * 0.3,
        justifyContent: "space-evenly",
        alignItems: 'center',
        ...alignment.MLmedium,
        ...alignment.MRmedium,
        ...alignment.MBmedium
    },
    imgResponsive: {
        height: scale(100),
        width: scale(100)
    },
    image: {
        width: undefined,
        height: undefined,
        flex: 1
    },
    backButton: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: scale(30),
        ...alignment.PBmedium,
        ...alignment.PLxSmall
    }
})

export default styles