import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#fff" },
  container: {
    flex: 1,
    padding: 16,
    paddingBottom: 16,
  },
  body: { flex: 1 },
  walletText: {
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 16,
  },
  walletNumber: { color: "red", marginLeft: 4 },
  input: { textAlign: "center" },
  suggestWrap: { flexDirection: "row" },
  noteWrap: {
    marginVertical: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  noteDot: {
    width: 4,
    height: 4,
    backgroundColor: "red",
    marginRight: 4,
  },
  methodTitleWrap: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 12,
  },
});
