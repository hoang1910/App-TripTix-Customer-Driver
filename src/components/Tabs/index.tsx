import React, { useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";

const TabsComponent = ({ tabs, initialTab, onTabPress }) => {
  const handleTabPress = (index) => {
    if (onTabPress) {
      onTabPress(index);
    }
  };

  return (
    <View style={{ flexDirection: "row" }}>
      {tabs.map((tab, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => handleTabPress(index)}
          style={{
            flex: 1,
            padding: 20,
            alignItems: "center",
            borderBottomWidth: initialTab === index ? 2 : 0,
            borderBottomColor: initialTab === index ? "#D2691E" : "transparent",
          }}
        >
          <Text
            style={{
              color: initialTab === index ? "#D2691E" : "black",
            }}
          >
            {tab}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default TabsComponent;
