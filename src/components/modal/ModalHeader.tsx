import React, { FC } from "react";
import { StyleSheet, Text, TextStyle, View } from "react-native";
import Icon from "react-native-vector-icons/Feather";

import Colors from "@constants/Colors";

interface ModalHeaderProps {
  onPress?: () => void;
  isDisabled?: boolean;
  title?: string;
  titleStyle?: TextStyle | TextStyle[];
  numberOfLines?: number;
  isShowBottomLine?: boolean;
  iconName?: string;
  iconColor?: string;
}

const ModalHeader: FC<ModalHeaderProps> = ({
  iconName,
  iconColor = Colors.grape,
  title,
  titleStyle,
  numberOfLines = 1,
}) => {
  function _renderIcon() {
    if (!iconName) return null;
    return <Icon name={iconName} size={16} color={iconColor} />;
  }

  function _renderTitle() {
    return (
      <View style={styles.titleWrapper}>
        <Text
          numberOfLines={numberOfLines}
          style={[
            styles.titleLabel,
            !iconName && styles.noMarginLeft,
            titleStyle,
          ]}
        >
          {title}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.headerWrapper}>
      {_renderIcon()}
      {_renderTitle()}
    </View>
  );
};

export default ModalHeader;

const styles = StyleSheet.create({
  headerWrapper: {
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  titleWrapper: {
    flex: 1,
  },
  titleLabel: {
    fontWeight: "500",
    marginLeft: 10,
    color: Colors.charcoal,
  },
  noMarginLeft: {
    marginLeft: 0,
  },
});
