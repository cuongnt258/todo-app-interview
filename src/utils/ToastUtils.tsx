import Toast from "react-native-toast-message";

const showSuccess = (text1: string, text2?: string) => {
  Toast.show({
    text1,
    text2,
    type: "success",
    position: "bottom",
    visibilityTime: 1000,
  });
};

const showError = (text1: string, text2?: string) => {
  Toast.show({
    text1,
    text2,
    type: "error",
    position: "bottom",
    visibilityTime: 1000,
  });
};

const ToastUtils = { showSuccess, showError };
export default ToastUtils;
