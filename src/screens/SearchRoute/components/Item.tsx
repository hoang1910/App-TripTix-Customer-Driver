import { Text } from "@rneui/themed";
import { TouchableOpacity } from "react-native";

export const Item: React.FC<{
  label: string;
  value: string;
  onPress: () => void;
  style?: any;
  textStyle?: any;
}> = ({ label, value, onPress, style, textStyle }) => {
  return (
    <TouchableOpacity onPress={onPress} style={style}>
      <Text>{label}</Text>
      <Text style={[{ fontWeight: "700", fontSize: 16 }, textStyle]}>
        {value}
      </Text>
    </TouchableOpacity>
  );
};
