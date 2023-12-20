import { Text } from "@rneui/themed";
import React from "react";
import { View } from "react-native";

export const Footer: React.FC = () => {
  return (
    <View
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <View
        style={{
          backgroundColor: "white",
          flexDirection: "column",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          paddingHorizontal: 40,
          paddingVertical: 20,
        }}
      >
        <Text
          style={{
            width: "100%",
            color: "#000",
            fontSize: 12,
            fontWeight: "bold",
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          Công ty TNHH TripTix
        </Text>
        <Text
          style={{
            color: "#000",
            fontSize: 12,
            fontWeight: "300",
            textAlign: "center",
          }}
        >
          Lô E2a-7, Đường D1, Đ. D1, Long Thạnh Mỹ, Thành Phố Thủ Đức, Thành phố
          Hồ Chí Minh 700000
        </Text>
        <Text
          style={{
            width: "100%",
            color: "#000",
            fontSize: 12,
            fontWeight: "bold",
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          Hotline:
        </Text>
        <Text
          style={{
            color: "#000",
            fontSize: 12,
            fontWeight: "300",
            textAlign: "center",
          }}
        >
          0961234567
        </Text>
        <Text
          style={{
            width: "100%",
            color: "#000",
            fontSize: 12,
            fontWeight: "bold",
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          Website:
        </Text>
        <Text
          style={{
            color: "#000",
            fontSize: 12,
            fontWeight: "300",
            textAlign: "center",
          }}
        >
          triptix.com
        </Text>
      </View>
    </View>
  );
};
