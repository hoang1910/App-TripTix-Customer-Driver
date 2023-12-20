import { Text } from "@rneui/themed";
import dayjs from "dayjs";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import DateTimePickerModal, {
  DateTimePickerProps,
} from "react-native-modal-datetime-picker";

export const DatePicker: React.FC<
  {
    value: Date;
    onConfirm: (value: Date) => void;
    renderButton?: (title: string, onPress: () => void) => React.ReactNode;
    placeholder?: string;
    label?: string;
  } & DateTimePickerProps
> = ({ value, onConfirm, renderButton, placeholder, label, ...props }) => {
  const [showPicker, setShowPicker] = useState(false);

  const handleClose = () => {
    setShowPicker(false);
  };
  const title = value ? dayjs(value).format("DD/MM/YYYY") : placeholder;
  return (
    <>
      {!!label && (
        <Text
          style={{
            paddingHorizontal: 12,
            fontSize: 16,
            fontWeight: "800",
            color: "gray",
          }}
        >
          Ngày sinh
        </Text>
      )}
      {renderButton ? (
        renderButton(title, () => setShowPicker(true))
      ) : (
        <TouchableOpacity
          style={{
            backgroundColor: "#fafafa",
            padding: 16,
            marginVertical: 12,
          }}
          onPress={() => setShowPicker(true)}
        >
          <Text style={{ color: value ? undefined : "#ccc" }}>{title}</Text>
        </TouchableOpacity>
      )}

      <DateTimePickerModal
        isVisible={showPicker}
        mode="date"
        onConfirm={(e: Date) => {
          onConfirm(e);
          handleClose();
        }}
        onCancel={handleClose}
        date={value}
        {...props}
      />
    </>
  );
};
