import React, { FC, ReactNode } from "react";
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";

import Colors from "@constants/Colors";

type HeaderProps = {
  customStyle?: ViewStyle | ViewStyle[];
  title: string;
  customTitleStyle?: TextStyle | TextStyle[];
  rightAction?: ReactNode;
  isEnableLeftAction?: boolean;
  leftIconName?: string;
  leftActionColor?: string;
  leftAction?: ReactNode;
  onPressLeft?: () => void;
  isEnableRightAction?: boolean;
  rightIconName?: string;
  rightActionColor?: string;
  onPressRight?: () => void;
};

const Header: FC<HeaderProps> = (props) => {
  const {
    customStyle,
    title = "",
    customTitleStyle,
    isEnableLeftAction = true,
    leftAction,
    leftActionColor = Colors.black,
    isEnableRightAction = false,
    rightAction,
    leftIconName = "chevron-left",
    onPressLeft,
    rightIconName,
    rightActionColor = Colors.black,
    onPressRight,
  } = props || {};

  const _renderLeftAction = () => {
    if (!isEnableLeftAction) return null;
    if (leftAction) return leftAction;
    if (!leftIconName) return null;

    return (
      <TouchableOpacity
        style={styles.button}
        disabled={!onPressLeft}
        onPress={onPressLeft}
      >
        <Icon name={leftIconName} size={24} color={leftActionColor} />
      </TouchableOpacity>
    );
  };

  const _renderRightAction = () => {
    if (!isEnableRightAction) return null;
    if (rightAction) return rightAction;
    if (!rightIconName) return null;

    return (
      <TouchableOpacity
        style={styles.button}
        disabled={!onPressRight}
        onPress={onPressRight}
      >
        <Icon name={rightIconName} size={24} color={rightActionColor} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, customStyle]}>
      <Text style={[styles.title, customTitleStyle]}>{title}</Text>
      <View style={styles.float}>
        {_renderLeftAction()}
        {_renderRightAction()}
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    height: 48,
  },
  float: {
    position: "absolute",
    left: 8,
    right: 8,
    justifyContent: "space-between",
    flexDirection: "row",
    zIndex: 123,
  },
  button: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    color: "black",
    fontWeight: "bold",
  },
});
