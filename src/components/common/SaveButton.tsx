import React, { FC } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import Colors from "@constants/Colors";

interface SaveButtonProps {
  onPress?: () => void;
  isDisabled?: boolean;
}

const SaveButton: FC<SaveButtonProps> = ({ onPress, isDisabled }) => {
  return (
    <TouchableOpacity
      disabled={isDisabled || !onPress}
      onPress={onPress}
      style={[styles.container, isDisabled && styles.disabled]}
    >
      <Text style={styles.title}>Save</Text>
    </TouchableOpacity>
  );
};

export default SaveButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.grape,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontWeight: "500",
    color: Colors.white,
    textTransform: "capitalize",
  },
  disabled: {
    backgroundColor: Colors.grey,
  },
});
