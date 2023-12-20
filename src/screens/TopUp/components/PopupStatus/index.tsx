import { TAppNavigation } from "@navigation/AppNavigator.type";
import { useNavigation } from "@react-navigation/native";
import { formatPrice } from "@utils/price";
import React from "react";
import { Image } from "react-native";
import { Text, TouchableOpacity, View } from "react-native";
import ReactNativeModal from "react-native-modal";

type Props = {
  money: number;
  status: "success" | "fail";
  onClose: () => void;
};

export const PopupStatus: React.FC<Props> = ({
  money = 0,
  status = "fail",
  onClose = () => {},
}) => {
  const navigation = useNavigation<TAppNavigation<"TopUp">>();
  const goHome = () => {
    navigation.replace("BottomTabNavigator");
  };

  const goSearchRoute = () => {
    navigation.replace("SearchRoute");
  };

  const tryAgain = () => {
    onClose();
  };

  return (
    <ReactNativeModal isVisible style={{ alignItems: "center" }}>
      <View
        style={{
          width: "90%",
          backgroundColor: "#fff",
          borderRadius: 20,
          paddingTop: 24,
        }}
      >
        <View style={{ alignItems: "center", marginBottom: 24 }}>
          <Image
            source={
              status === "success"
                ? require("@assets/images/happy.png")
                : require("@assets/images/sad.png")
            }
            style={{ width: 100, height: 100, marginBottom: 24 }}
          />
          <Text style={{ fontSize: 18, fontWeight: "900" }}>
            {status === "success"
              ? "Thanh toán thành công"
              : "Thanh toán thất bại"}
          </Text>
          <Text style={{ textAlign: "center" }}>
            {status === "success"
              ? `Bạn đã nạp thành công ${formatPrice(
                  money
                )} vào ví.\n Bạn có muốn đặt vé không?`
              : "Vui lòng thử lại hoặc quay về trang chủ"}
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            borderTopWidth: 1,
            borderTopColor: "#ccc",
          }}
        >
          <TouchableOpacity
            onPress={goHome}
            style={{
              paddingVertical: 16,
              paddingHorizontal: 4,
              flex: 1,
              alignItems: "center",
              borderRightWidth: 1,
              borderRightColor: "#ccc",
            }}
          >
            <Text>Về trang chủ</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={status === "success" ? goSearchRoute : tryAgain}
            style={{
              paddingVertical: 16,
              paddingHorizontal: 4,
              flex: 1,
              alignItems: "center",
              borderLeftWidth: 1,
              borderLeftColor: "#ccc",
            }}
          >
            <Text style={{ fontWeight: "600" }}>
              {status === "success" ? "Đặt vé" : "Thử lại"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ReactNativeModal>
  );
};
