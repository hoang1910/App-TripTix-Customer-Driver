import React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";

export const Banner: React.FC<{
  from: { id: string; title: string };
  to: { id: string; title: string };
  onPress: (fromId: string, toId: string) => void;
  image: string;
  desc: string;
}> = ({ from = {}, to = {}, onPress = () => {}, image, desc }) => {
  return (
    <TouchableOpacity
      onPress={() => onPress(from.id, to.id)}
      style={{
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        backgroundColor: "#fff",
        borderRadius: 12,
        marginBottom: 24,
        overflow: "hidden",
        marginHorizontal: 16,
      }}
    >
      <Image source={{ uri: image }} style={{ width: "100%", height: 150 }} />
      <View style={{ padding: 12 }}>
        <Text style={{ fontSize: 16, fontWeight: "800", marginVertical: 8 }}>
          {from.title} - {to.title}
        </Text>
        <Text numberOfLines={3}>{desc}</Text>
      </View>
    </TouchableOpacity>
  );
};
