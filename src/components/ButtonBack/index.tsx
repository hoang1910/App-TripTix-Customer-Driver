import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { TouchableOpacity } from "react-native";

export const ButtonBack: React.FC<{ onPress: () => void }> = ({ onPress }) => {
  return (
    <TouchableOpacity style={{ padding: 8 }} onPress={onPress}>
      <Icon name="chevron-back-outline" size={24} />
    </TouchableOpacity>
  );
};
