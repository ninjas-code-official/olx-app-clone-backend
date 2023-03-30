import { Dimensions, StyleSheet } from "react-native";
import { alignment, colors, scale } from "../../../utilities";
const { height } = Dimensions.get("window");

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  safeAreaViewStyles: {
    backgroundColor: colors.headerbackground,
  },
  mainContainer: {
    backgroundColor: colors.themeBackground,
  },
  headerContainer: {
    width: "100%",
    height: scale(50),
    backgroundColor: colors.headerbackground,
    justifyContent: "space-evenly",
    alignItems: "center",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.horizontalLine,
  },
  headerContents: {
    width: "95%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  closeBtn: {
    width: "100%",
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderRadius: scale(5),
    height: scale(30),
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: colors.headerbackground,
    overflow: "hidden",
  },
  backBtn: {
    height: "100%",
    height: "100%",
    width: "10%",
    justifyContent: "center",
    alignItems: "center",
  },
  searchBtn: {
    backgroundColor: colors.buttonbackground,
    height: "100%",
    width: "10%",
    justifyContent: "center",
    alignItems: "center",
  },
  inputText: {
    width: "80%",
    ...alignment.PLxSmall,
    ...alignment.PRxSmall,
  },
  inputAddress: {
    width: "90%",
    ...alignment.PLxSmall,
    ...alignment.PRxSmall,
  },
  body: {
    ...alignment.Plarge,
  },
  category: {
    flexDirection: "row",
    alignItems: "center",
    ...alignment.MTlarge,
  },
  fontText: {
    flex: 1,
    ...alignment.PLlarge,
  },
});

export default styles;
