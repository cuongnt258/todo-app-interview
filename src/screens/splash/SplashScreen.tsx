import React, { FC, useEffect } from "react";
import { Image, StyleSheet } from "react-native";

import { Layout } from "@components";
import { StackScreenProps } from "@react-navigation/stack";
import { useAppDispatch } from "@store";

import Images from "@assets/images";

import Colors from "@constants/Colors";

import { syncAll } from "@store/slices/settingSlice";

import type { RootStackParamList } from "../../constants/Navigation";

const SplashScreen: FC<StackScreenProps<RootStackParamList, "Splash">> = ({
  navigation,
}) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    _initApp();
  }, []);

  const _initApp = async () => {
    const res = await dispatch(syncAll()).unwrap();
    if (res) navigation.replace("MainStack");
  };

  return (
    <Layout customStyle={styles.container}>
      <Image source={Images.Logo} style={styles.logo} />
    </Layout>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.grape,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 64,
    height: 64,
  },
});
