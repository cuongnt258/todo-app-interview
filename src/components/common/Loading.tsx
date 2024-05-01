import React, {
  createRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import {
  ActivityIndicator,
  BackHandler,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";

import Colors from "@constants/Colors";

export type LoadingHandle = {
  setLoading: (value: boolean) => void;
};

export const refLoading = createRef<LoadingHandle>();

const Loading = React.forwardRef<LoadingHandle>(() => {
  const [isVisible, setVisible] = useState(false);
  const refBackHandler = useRef<any>(null);

  useImperativeHandle(refLoading, () => ({
    setLoading: _setLoading,
  }));

  useEffect(() => {
    _removeHandler();
  }, []);

  const _removeHandler = () => {
    refBackHandler.current && refBackHandler.current.remove();
  };

  const onBackPress = () => {
    return isVisible;
  };

  const _setLoading = (isLoading: boolean) => {
    _removeHandler();

    if (isLoading) {
      refBackHandler.current = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress,
      );
    }

    setVisible(isLoading);
  };

  const styleCenter = {
    ...StyleSheet.absoluteFillObject,
    position: "absolute",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00000080",
  } as ViewStyle;

  if (!isVisible) return null;
  return (
    <View style={styleCenter}>
      <ActivityIndicator color={Colors.white} size="large" />
    </View>
  );
});

export default Loading;
