import React from "react";
import Icon from "react-native-vector-icons/FontAwesome5";
import { TouchableOpacity, View } from "react-native";
import { Text } from "@rneui/themed";

export const WalletItem: React.FC<{
  icon: string;
  title: string;
  onPress: () => void;
}> = ({ icon, title, onPress = () => {} }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ alignItems: "center", flex: 1 }}
    >
      <Icon name={icon} size={24} color={"#f27751"} />
      <Text style={{fontFamily:"SVN-Gilroy-Medium"}}>{title}</Text>
    </TouchableOpacity>
  );
};
