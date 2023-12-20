import { Divider, Text } from "@rneui/themed";
import React from "react";
import { View } from "react-native";
import { WalletItem } from "../WalletItem";
import { useNavigation } from "@react-navigation/native";
import { TAppNavigation } from "@navigation/AppNavigator.type";

export const PayBox: React.FC<{ coins: number; voucherCoins: number }> = ({
  coins = 0,
  voucherCoins = 0,
}) => {
  const navigation = useNavigation<TAppNavigation<"Home">>();

  const handleTopUp = () => {
    navigation.navigate("TopUp");
  };

  return (
    <View
      style={{
        height: 150,
        backgroundColor: "#fff",
        marginHorizontal: 16,
        marginTop: -40,
        borderRadius: 20,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        zIndex: 101,
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 1, borderRightWidth: 1, borderColor: "#dde2e8" }}>
          <Text style={{ fontFamily:"SVN-Gilroy-Medium" }}>Số dư</Text>
          <Text style={{ fontFamily:"SVN-Gilroy-XBold" }}>
            {coins.toLocaleString("en-US")} xu
          </Text>
        </View>
        <View style={{ flex: 1, alignItems: "flex-end" }}>
          <Text style={{ fontFamily:"SVN-Gilroy-Medium" }}>Tài khoản khuyến mại</Text>
          <Text style={{ fontFamily:"SVN-Gilroy-XBold" }}>
            {voucherCoins.toLocaleString("en-US")} xu
          </Text>
        </View>
      </View>
      <Divider style={{ marginVertical: 16 }} />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <WalletItem icon="folder-plus" title="Nạp tiền" onPress={handleTopUp} />
        <WalletItem
          icon="coins"
          title="Đổi xu"
          onPress={() => navigation.navigate("Point")}
        />
        <WalletItem
          icon="history"
          title="Lịch sử GD"
          onPress={() => navigation.navigate("TransactionHistory")}
        />
      </View>
    </View>
  );
};
