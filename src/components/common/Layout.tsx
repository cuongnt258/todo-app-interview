import React, { FC, ReactNode } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

import Colors from "@constants/Colors";

export type LayoutProps = {
  children?: ReactNode;
  customStyle?: StyleProp<ViewStyle>;
};

const Layout: FC<LayoutProps> = ({ children, customStyle }) => {
  return <View style={[styles.container, customStyle]}>{children}</View>;
};

export default Layout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});
