import Icon from "react-native-vector-icons/FontAwesome5";
import React from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import { Text } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { TAppNavigation } from "@navigation/AppNavigator.type";

export const ListActions: React.FC = () => {
  const navigation = useNavigation<TAppNavigation<"Home">>();

  const goToSearchRoute = () => {
    navigation.navigate("SearchRoute");
  };

  return (
    <View style={{ padding: 16 }}>
      <Text
        style={{
          fontSize: 16,
          fontFamily:'SVN-Gilroy-SemiBold',
          flex: 1,
          marginBottom: 16,
        }}
      >
        Hành động
      </Text>
      <View style={styles.container}>
        <Action title="Đặt vé" onPress={goToSearchRoute} />
      </View>
    </View>
  );
};

const Action: React.FC<{ title: string; onPress: () => void }> = ({
  title,
  onPress,
}) => {
  return (
    <TouchableOpacity style={{ alignItems: "center" }} onPress={onPress}>
      <View style={styles.iconWrap}>
        <Icon name="car" color={"green"} size={24} />
      </View>
      <Text style={{fontFamily:"SVN-Gilroy-Regular"}}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: "row" },
  iconWrap: {
    backgroundColor: "#ccc",
    borderRadius: 200,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
});
