import React, { FC, useEffect } from "react";

import { StackScreenProps } from "@react-navigation/stack";

import type { RootStackParamList } from "@constants/Navigation";

const SplashScreen: FC<StackScreenProps<RootStackParamList, "Splash">> = ({
  navigation,
}) => {
  useEffect(() => {
    navigation.replace("Main");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <></>;
};

export default SplashScreen;
