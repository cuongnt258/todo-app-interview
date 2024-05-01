import { useEffect } from "react";
import { BackHandler } from "react-native";

import { useNavigation } from "@react-navigation/native";

function useBackHandler(onBackPress: () => void, deps = []) {
  const navigation = useNavigation() || {};

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBackPress,
    );

    return () => {
      backHandler.remove();
    };
  }, deps);

  function handleBackPress() {
    if (onBackPress) {
      onBackPress();
      return true;
    }

    if (navigation.canGoBack()) {
      navigation.goBack();
    }

    return true;
  }
}

export default useBackHandler;
