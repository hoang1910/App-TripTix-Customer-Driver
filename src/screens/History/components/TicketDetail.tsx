import ReactNativeModal from "react-native-modal";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { formatPrice } from "@utils/price";
import { CarTypes } from "@constants/route";
import { getColorStatus } from "./TichketHistory";
import { timeStampToUtc } from "@utils/time";

export const TicketDetail = ({
  onClose = () => {},
  show,
  booking = {},
}: {
  onClose: () => void;
  show: boolean;
  booking: Record<string, any> | null;
}) => {
  const color = getColorStatus(booking.bookingStatus);

  return (
    <ReactNativeModal isVisible={show}>
      <ScrollView
        style={{
          backgroundColor: "#fff",
          borderRadius: 20,
          padding: 24,
          maxHeight: "80%",
        }}
      >
        <TouchableOpacity
          onPress={onClose}
          style={{
            padding: 4,
            position: "absolute",
            right: 0,
            top: 0,
            zIndex: 10,
          }}
        >
          <Icon name="close-circle" size={24} color={"#ccc"} />
        </TouchableOpacity>
        {/* <View
          style={{
            width: 60,
            height: 60,
            backgroundColor: color,
            position: "absolute",
            top: 120,
            right: 20,
            transform: [{ rotate: "-30deg" }],
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 200,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 5,
          }}
        >
          <View
            style={{
              width: 50,
              height: 50,
              backgroundColor: "#fff",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 200,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "900",
                textShadowColor: "rgba(0, 0, 0, 0.75)",
                textShadowOffset: { width: -1, height: 1 },
                textShadowRadius: 10,
                color: color,
                width: 90,
                borderWidth: 2,
                borderColor: color,
                backgroundColor: "#fff",
                paddingHorizontal: 4,
                textAlign: "center",
              }}
            >
              {booking.bookingStatus}
            </Text>
          </View>
        </View> */}
        <Text style={{ fontSize: 18, fontFamily: "SVN-Gilroy-XBold", textAlign: "center" }}>
          Thông tin chuyến đi
        </Text>
        <View style={{ alignItems: "center", marginVertical: 16 }}>
          <QRCode value={booking.bookingCode} />
        </View>

        <View style={{ marginBottom: 16 }}>
          <InfoItem label="Mã đặt vé" value={booking.bookingCode} />
          <InfoItem
            label="Tuyến xe"
            value={`${booking.tripDTO?.routeDTO.departurePoint} - ${booking.tripDTO?.routeDTO.destination}`}
          />
          <InfoItem
            label="Giờ khởi hành"
            value={timeStampToUtc(booking?.tripDTO?.startTimee).format(
              "HH:mm - DD/MM/YYYY"
            )}
          />
          <InfoItem label="Tổng số ghế" value={booking.listTicket.length} />
          <InfoItem
            label="Mã số ghế"
            value={booking.listTicket.map((item) => item.seatName).join(" ,")}
          />
          <InfoItem label="Điểm đón" value={booking.pickUpPoint} />
          <InfoItem label="Điểm xuống" value={booking.dropOffPoint} />
          <InfoItem
            label="Tổng thanh toán"
            value={formatPrice(booking.totalPrice)}
          />
        </View>
        <View style={{ marginBottom: 16 }}>
          <InfoItem label="Tên xe" value={booking.tripDTO?.busDTO.name} />
          <InfoItem
            label="Biển số xe"
            value={booking.tripDTO?.busDTO.licensePlates}
          />
          <InfoItem
            label="Loại xe"
            value={CarTypes[booking.tripDTO?.busDTO.type]}
          />
          <InfoItem
            label="Ghi chú"
            value={booking.tripDTO?.busDTO.description}
          />
          <InfoItem
            label="Tài xế"
            value={booking.tripDTO?.driverDTO.fullName}
          />
          <InfoItem label="SĐT" value={booking.tripDTO?.driverDTO.phone} />
        </View>
      </ScrollView>
    </ReactNativeModal>
  );
};

const InfoItem = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => {
  return (
    <View style={{ flexDirection: "row", marginBottom: 4 }}>
      <Text style={{ flex: 1,fontFamily:'SVN-Gilroy-Medium' }}>{label}</Text>
      <Text style={{ flex: 2, fontFamily: "SVN-Gilroy-Bold" }}>{value}</Text>
    </View>
  );
};
