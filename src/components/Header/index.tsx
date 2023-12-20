import { Text } from "@rneui/themed";
import React from "react";
import { View } from "react-native";

export const Header: React.FC = ({
  title,
  children,
  color,
  colorText,
}: any) => {
  return (
    <View
      style={{
        backgroundColor: color,
        padding: 25,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
      }}
    >
      {children ? (
        children
      ) : (
        <Text style={{ color: colorText, fontSize: 16, fontWeight: "bold" }}>
          {title}
        </Text>
      )}
    </View>
  );
};
