import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  wrap: {
    backgroundColor: "#fff7f5",
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
    marginBottom: 50,
    marginHorizontal: 16,
    marginTop: 16,
  },
  routeWrap: {
    flexDirection: "row",
    marginBottom: 16,
  },
  timeWrap: { paddingTop: 16 },
  buttonSearch: {
    position: "absolute",
    bottom: -15,
    left: "50%",
    width: 100,
    marginLeft: -25,
  },
});
