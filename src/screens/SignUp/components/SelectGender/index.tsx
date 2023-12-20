import { ListGender } from "@constants/user";
import { CheckBox } from "@rneui/themed";
import React from "react";
import { View, Text } from "react-native";

export const SelectGender: React.FC<{
  value: string;
  onChange: (value: string) => void;
  label?: string;
}> = ({ value, onChange, label }) => {
  return (
    <View>
      {label && (
        <Text
          style={{
            paddingHorizontal: 12,
            fontSize: 16,
            fontWeight: "800",
            color: "gray",
          }}
        >
          {label}
        </Text>
      )}
      <View style={{ flexDirection: "row" }}>
        {ListGender.map((item, index) => (
          <CheckBox
            key={index}
            checked={value === item.value}
            onPress={() => onChange(item.value)}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            title={item.label}
            checkedColor="orange"
            textStyle={{fontFamily:'SVN-Gilroy-Medium'}}
          />
        ))}
      </View>
    </View>
  );
};
