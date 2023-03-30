import { StyleSheet } from 'react-native';
import { colors, scale } from '../../../utilities';

const styles = StyleSheet.create({
    flex: {
        flex: 1,
        // justifyContent: "center",
        // alignItems: "center"
    },
    safeAreaViewStyles: {
        backgroundColor: colors.headerbackground
    },
    mainContainer: {
        backgroundColor: colors.themeBackground,
        // justifyContent: 'space-between'
    },
    box: {
        height: 100,
        width: 100,
        backgroundColor: 'red'
    }
})
export default styles