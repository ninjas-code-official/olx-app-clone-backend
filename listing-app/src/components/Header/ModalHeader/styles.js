import { Dimensions, StyleSheet } from 'react-native'
import { colors } from '../../../utilities'
const { height } = Dimensions.get('window')

const styles = StyleSheet.create({
    headerContainer: {
        width: '100%',
        height: height * 0.07,
        backgroundColor: colors.headerbackground,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: colors.horizontalLine
    },
    headerContents: {
        width: '100%',
        height: '90%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    closeBtn: {
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "15%"
    },
    title: {
        width: "70%"
    }
})

export default styles