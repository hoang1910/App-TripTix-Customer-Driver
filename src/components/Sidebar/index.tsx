// Sidebar.js

import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Animated,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

const Sidebar = ({ isOpen, toggleSidebar, children }) => {
  const sidebarWidth = 200;
  const translateX = new Animated.Value(isOpen ? 0 : -sidebarWidth);

  const toggle = () => {
    Animated.timing(translateX, {
      toValue: isOpen ? -sidebarWidth : 0,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  return (
    <Animated.View
      style={[
        styles.sidebarContainer,
        {
          transform: [{ translateX }],
        },
      ]}
    >
      <View
        style={{
          width: "100%",
          display: "flex",
          alignItems: "flex-end",
          backgroundColor: "#228B22",
          paddingBottom: 10,
        }}
      >
        <TouchableOpacity onPress={toggleSidebar}>
          <Text style={{ paddingTop: 10, paddingRight: 10 }}>
            <Icon style={{ color: "white" }} name="leftsquareo" size={24} />
          </Text>
        </TouchableOpacity>
      </View>
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  sidebarContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    width: 200,
    elevation: 8,
    backgroundColor: "white",
  },
});

export default Sidebar;
