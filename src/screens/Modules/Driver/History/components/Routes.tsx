import { Button } from "@rneui/themed";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { FlatList, RefreshControl, View } from "react-native";
import { StyleSheet } from "react-native";
import { Text } from "react-native-elements";
import { ScrollView } from "react-native";
import dayjs from "dayjs";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TAppNavigation } from "@navigation/AppNavigator.type";
const RoutesArr = [
  {
    id: 1,
    code: "QƯEQRA",
    startTime: dayjs().format("DD-MM-YYYY HH:mm"),
    status: 1,
    departurePoint: "Lâm Đồng",
    destination: "Hồ chí mình",
    bookedSeat: "A4,A15",
    timeDestination: dayjs().format("HH:mm"),
  },
  {
    id: 1,
    code: "QƯEQRA",
    startTime: dayjs().format("DD-MM-YYYY HH:mm"),
    status: 1,
    departurePoint: "Lâm Đồng",
    destination: "Hồ chí mình",
    bookedSeat: "A4,A15",
    timeDestination: dayjs().format("HH:mm"),
  },
  {
    id: 1,
    code: "QƯEQRA",
    startTime: dayjs().format("DD-MM-YYYY HH:mm"),
    status: 1,
    departurePoint: "Lâm Đồng",
    destination: "Hồ chí mình",
    bookedSeat: "A4,A15",
    timeDestination: dayjs().format("HH:mm"),
  },
  {
    id: 2,
    code: "QƯEQRA",
    startTime: dayjs().format("DD-MM-YYYY HH:mm"),
    status: 2,
    departurePoint: "Lâm Đồng",
    destination: "Hồ chí mình",
    bookedSeat: "A4,A15",
    timeDestination: dayjs().format("HH:mm"),
  },
  {
    id: 3,
    code: "QƯEQRA",
    startTime: dayjs().format("DD-MM-YYYY HH:mm"),
    status: 3,
    departurePoint: "Lâm Đồng",
    destination: "Hồ chí mình",
    bookedSeat: "A4,A15",
    timeDestination: dayjs().format("HH:mm"),
  },
  {
    id: 4,
    code: "QƯEQRA",
    startTime: dayjs().format("DD-MM-YYYY HH:mm"),
    status: 4,
    departurePoint: "Lâm Đồng",
    destination: "Hồ chí mình",
    bookedSeat: "A4,A15",
    timeDestination: dayjs().format("HH:mm"),
  },
  {
    id: 5,
    code: "QƯEQRA",
    startTime: dayjs().format("DD-MM-YYYY HH:mm"),
    status: 1,
    departurePoint: "Lâm Đồng",
    destination: "Hồ chí mình",
    bookedSeat: "A4,A15",
    timeDestination: dayjs().format("HH:mm"),
  },
];

export const Routes = () => {
  const navigation = useNavigation<TAppNavigation<"HistoryDriver">>();

  const [data, setData] = useState(RoutesArr);

  const onPressRoute = (ticket: any) => {
    navigation.navigate("DetailRoute");
  };
  return (
    <ScrollView style={{ paddingBottom: 120, width: "100%" }}>
      {data &&
        data.map((ticket) => (
          <TouchableOpacity onPress={() => onPressRoute(ticket)}>
            <View key={ticket.id} style={styles.ticket}>
              <View style={styles.ticketHeader}>
                <Text style={{ color: "gray", fontSize: 16 }}>
                  Giờ xuất bến
                </Text>
                <Text style={{ color: "orange", fontSize: 30 }}>
                  {dayjs(ticket.startTime).format("HH:mm")}
                </Text>
                <Text style={{ fontSize: 18, color: "gray" }}>
                  {dayjs(ticket.startTime).format("DD-MM-YYYY")}
                </Text>
              </View>
              <View style={styles.ticketContent}>
                <Text style={styles.ticketLabel}>
                  Điểm xuất phát:
                  <Text style={styles.ticketValue}>
                    {ticket.departurePoint}
                  </Text>
                </Text>

                <Text style={styles.ticketLabel}>
                  Điểm kết thúc:
                  <Text style={styles.ticketValue}>{ticket.destination}</Text>
                </Text>
                <Text style={styles.ticketLabel}>
                  Giờ tới bến:
                  <Text style={styles.ticketValueTime}>
                    {ticket.timeDestination}
                  </Text>
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  ticket: {
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "row",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    width: "100%",
    justifyContent: "flex-start",
  },
  ticketHeader: {
    flexDirection: "column",
    justifyContent: "flex-start",
    marginBottom: 15,
    borderRightWidth: 1,
    borderStyle: "dotted",
    paddingRight: 10,
    alignItems: "center",
    marginRight: 20,
  },
  ticketContent: {
    marginBottom: 10,
  },
  ticketLabel: {
    fontWeight: "400",
    marginBottom: 5,
    color: "gray",
  },
  ticketValue: {
    fontSize: 16,
    fontWeight: "bold",
  },
  ticketValueTime: {
    fontSize: 16,
    fontWeight: "bold",
    color: "orange",
  },
});
