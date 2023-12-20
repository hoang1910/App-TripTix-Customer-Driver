import { Button, ButtonProps } from "@rneui/themed";
import React from "react";
import { StyleSheet } from "react-native";

export const ButtonApp: React.FC<ButtonProps> = ({
  buttonStyle,
  titleStyle,
  ...props
}) => {
  return (
    <Button
      titleStyle={[{ fontSize: 16 }, titleStyle]}
      buttonStyle={[buttonStyle, styles.btnStyle]}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  btnStyle: {
    borderRadius: 20,
    padding: 12,
    fontSize: 14,
  },
});
