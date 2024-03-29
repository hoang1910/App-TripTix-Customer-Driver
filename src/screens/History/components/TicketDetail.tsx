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
          <QRCode value={booking.ticketCodeImg} />
        </View>

        <View style={{ marginBottom: 16 }}>
          <InfoItem label="Mã đặt vé" value={booking.ticketCode} />
          <InfoItem
            label="Tuyến xe"
            value={`${booking.trip.nameRoute}`}
          />
          <InfoItem
            label="Giờ khởi hành"
            value={timeStampToUtc(booking?.trip?.departureDate).format(
              "HH:mm - DD/MM/YYYY"
            )}
          />
          {/* <InfoItem label="Tổng số ghế" value={booking.listTicket.length} /> */}
          <InfoItem
            label="Mã số ghế"
            // value={booking.listTicket.map((item) => item.seatName).join(" ,")}
            value={booking.seatName}
          />  
          <InfoItem label="Điểm đón" value={booking.onStation.name} />
          <InfoItem label="Điểm xuống" value={booking.offStation.name} />
          <InfoItem
            label="Tổng thanh toán"
            value={formatPrice(booking.price)}
          />
        </View>
        <View style={{ marginBottom: 16 }}>
          <InfoItem label="Tên xe" value={booking.trip?.vehicleDTO.name} />
          <InfoItem
            label="Biển số xe"
            value={booking.trip?.vehicleDTO.licensePlates}
          />
          <InfoItem
            label="Loại xe"
            value={booking.trip?.vehicleDTO.type}
          />
          
          <InfoItem
            label="Tài xế"
            value={booking.trip?.driverDTO.fullName}
          />
          <InfoItem label="SĐT" value={booking.trip?.driverDTO.phone} />
          <InfoItem label="Đánh giá sao" value={booking.star} />

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
