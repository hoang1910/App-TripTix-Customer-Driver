import React, { useState } from "react";
import { View } from "react-native";
import DropDownPicker, {
  DropDownPickerProps,
} from "react-native-dropdown-picker";

export const Select: React.FC<DropDownPickerProps<"string">> = ({
  ...props
}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);

  return (
    <View
      style={{
        marginVertical: 12,
      }}
    >
      <DropDownPicker
        style={{
          backgroundColor: "#fafafa",
          borderRadius: 8,
          borderWidth: 0,
        }}
        open={open}
        value={value}
        setValue={setValue}
        setOpen={setOpen}
        placeholder={props.placeholder}
        placeholderStyle={{ color: "#ccc" }}
        zIndex={9999}
        zIndexInverse={1000}
        {...props}
      />
    </View>
  );
};
