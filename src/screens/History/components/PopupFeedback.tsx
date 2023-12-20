import { View, Text, TouchableOpacity } from "react-native";
import ReactNativeModal from "react-native-modal";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { AirbnbRating, Input } from "@rneui/themed";
import { useForm, Controller } from "react-hook-form";

export const PopupFeedback = ({
  ticket,
  onClose = () => {},
  onConfirm,
  show,
}) => {
  const { control, handleSubmit } = useForm({
    defaultValues: { star: 5, feedback: "" },
  });

  return (
    <ReactNativeModal isVisible={show}>
      <View style={{ backgroundColor: "#fff", borderRadius: 20 }}>
        <TouchableOpacity
          onPress={onClose}
          style={{
            padding: 4,
            position: "absolute",
            right: 10,
            top: 10,
            zIndex: 10,
          }}
        >
          <Icon name="close-circle" size={24} color={"#ccc"} />
        </TouchableOpacity>
        <View style={{ padding: 20 }}>
          <Text
            style={{ fontSize: 18, fontWeight: "800", textAlign: "center" }}
          >
            Bạn đánh sao về chuyến đi này?
          </Text>
          <View style={{ alignItems: "center" }}>
            <Controller
              control={control}
              name="star"
              render={({ field: { value, onChange } }) => (
                <AirbnbRating defaultRating={value} onFinishRating={onChange} />
              )}
            />
          </View>
          {/* <Controller
            control={control}
            name="feedback"
            render={({ field: { value, onChange } }) => (
              <Input
                containerStyle={{ marginTop: 16 }}
                label={"Nhận xét (Tuỳ chọn)"}
                placeholder="Viết nhận xét"
                value={value}
                onChangeText={onChange}
              />
            )}
          /> */}
        </View>
        <View
          style={{
            flexDirection: "row",
            borderTopWidth: 1,
            borderTopColor: "#ccc",
          }}
        >
          <TouchableOpacity
            onPress={handleSubmit((value: any) =>
              onConfirm(ticket.idBooking, value.star)
            )}
            style={{
              paddingVertical: 16,
              paddingHorizontal: 4,
              flex: 1,
              alignItems: "center",
              borderRightWidth: 1,
              borderRightColor: "#ccc",
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "900" }}>Đánh giá</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ReactNativeModal>
  );
};
