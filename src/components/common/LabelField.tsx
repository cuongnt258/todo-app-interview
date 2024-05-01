import React, { FC, ReactNode } from "react";
import { StyleSheet, Text, TouchableOpacity, ViewStyle } from "react-native";
import Icon from "react-native-vector-icons/Feather";

import Colors from "@constants/Colors";

interface LabelFieldProps {
  onPress?: () => void;
  value?: string;
  placeholder?: string;
  leftIconName?: string;
  isDisabled?: boolean;
  leftIconColor?: string;
  isEnableLeftIcon?: boolean;
  onPressLeftIcon?: () => void;
  placeholderColor?: string;
  customStyle?: ViewStyle;
}

const LabelField: FC<LabelFieldProps> = (props) => {
  const {
    onPress,
    value,
    placeholder,
    placeholderColor = Colors.grey,
    isEnableLeftIcon,
    leftIconName,
    leftIconColor = Colors.grey,
    customStyle,
  } = props || {};

  const _renderLeftIcon = () => {
    if (!isEnableLeftIcon || !leftIconName) return null;

    return (
      <Icon
        name={leftIconName}
        size={16}
        color={leftIconColor}
        style={{ marginRight: 4 }}
      />
    );
  };

  return (
    <TouchableOpacity
      hitSlop={{
        top: 8,
        bottom: 12,
        left: 12,
        right: 8,
      }}
      onPress={onPress}
      disabled={!onPress}
      style={[styles.container, customStyle]}
    >
      {_renderLeftIcon()}
      <Text
        style={[
          styles.label,
          !value && {
            color: placeholderColor,
          },
        ]}
      >
        {value || placeholder}
      </Text>
    </TouchableOpacity>
  );
};

export default LabelField;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 0,
    height: 48,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: Colors.grey + "50",
    paddingHorizontal: 16,
  },
  label: {
    flex: 1,
    color: Colors.black,
    paddingVertical: 0,
    borderWidth: 0,
    paddingHorizontal: 10,
  },
});
