import React, {
  FC,
  ReactNode,
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";

import Colors from "@constants/Colors";

type InputProps = {
  isDisabled?: boolean;
  isError?: boolean;
  errorMessage?: string;
  value?: string;
  onPress?: () => void;
  inputColor?: string;
  placeholderColor?: string;
  containerStyle?: ViewStyle | ViewStyle[];
  customLeading?: ReactNode;
  customTrailing?: ReactNode;
  isEnableLeftIcon?: boolean;
  leftIconName?: string;
  isEnableRightIcon?: boolean;
  rightIconName?: string;
  onPressLeftIcon?: () => void;
  onPressRightIcon?: () => void;
  leftIconColor?: string;
  rightIconColor?: string;
  inputStyle?: ViewStyle;
  customStyle?: ViewStyle;
  onFocus?: () => void;
  maxLength?: number;
  secureTextEntry?: boolean;
  isTextArea?: boolean;
  onContentSizeChange?: () => void;
  onBlur?: () => void;
  label?: string;
  inputErrorColor?: string;
  autoCorrect?: boolean;
  isEnableError?: boolean;
} & TextInputProps;

interface InputRef {
  setText: (textValue: string) => void;
}

const Input: FC<InputProps> = forwardRef<InputRef, InputProps>((props, ref) => {
  const refInput = useRef<TextInput>(null);

  const [isFocus, setFocus] = useState<boolean>(false);

  const {
    isDisabled,
    onPress,
    value,
    inputColor = Colors.grape,
    placeholderColor = Colors.grey,
    containerStyle,
    customLeading,
    customTrailing,
    isEnableLeftIcon,
    isEnableRightIcon,
    leftIconName,
    rightIconName,
    onPressRightIcon,
    leftIconColor = Colors.grey,
    rightIconColor,
    inputStyle,
    customStyle,
    onFocus,
    isTextArea,
    onContentSizeChange,
    onBlur,
    isEnableError,
    isError,
    errorMessage,
    label,
    inputErrorColor,
    numberOfLines,
  } = props || {};

  const errorColor = isError ? inputErrorColor ?? Colors.red : Colors.grape;

  const errorBorderColor = isError
    ? inputErrorColor || Colors.red
    : Colors.grey + "50";

  const _setText = (textValue: string) => {
    refInput.current?.setNativeProps?.({ text: textValue });
  };

  useImperativeHandle(ref, () => ({
    setText: _setText,
  }));

  const _handleBlur = () => {
    setFocus(false);
    onBlur?.();
  };

  const _handleFocus = () => {
    setFocus(true);
    onFocus?.();
  };

  const _renderLeftIcon = () => {
    if (!isEnableLeftIcon || !leftIconName) return null;

    return (
      <Icon
        name={leftIconName}
        size={16}
        color={isFocus ? inputColor : leftIconColor}
        style={{ marginRight: 4 }}
      />
    );
  };

  const _renderRightIcon = () => {
    if (!isEnableRightIcon || !rightIconName) return null;

    return (
      <TouchableOpacity onPress={onPressRightIcon}>
        <Icon
          name={rightIconName}
          size={20}
          color={rightIconColor}
          style={{ marginLeft: 4 }}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={StyleSheet.flatten([styles.containerStyle, containerStyle])}>
      {!!label && (
        <View style={styles.labelContainer}>
          <Text style={styles.label}>{label}</Text>
        </View>
      )}
      <TouchableOpacity
        hitSlop={{
          top: 8,
          bottom: 12,
          left: 12,
          right: 8,
        }}
        onPress={onPress}
        style={[
          styles.input,
          { borderColor: isFocus ? inputColor : errorBorderColor },
          customStyle,
        ]}
      >
        {customLeading}
        {_renderLeftIcon()}
        <TextInput
          onFocus={_handleFocus}
          ref={refInput}
          numberOfLines={numberOfLines || isTextArea ? 4 : undefined}
          multiline={!!isTextArea}
          textAlignVertical={isTextArea ? "top" : "center"}
          style={[
            styles.textInputStyle,
            {
              color:
                isError && !isFocus ? errorColor || Colors.red : Colors.black,
            },
            inputStyle,
          ]}
          editable={!isDisabled}
          placeholderTextColor={placeholderColor}
          value={value}
          underlineColorAndroid="transparent"
          onContentSizeChange={onContentSizeChange}
          pointerEvents={typeof onPress === "function" ? "none" : undefined}
          onBlur={_handleBlur}
          {...props}
        />

        {_renderRightIcon()}
        {customTrailing || null}
      </TouchableOpacity>
      {isEnableError && (
        <View style={styles.errorContainer}>
          {isError && (
            <Text style={styles.textError} numberOfLines={1}>
              {errorMessage}
            </Text>
          )}
        </View>
      )}
    </View>
  );
});

Input.displayName = "Input";

export default Input;

const styles = StyleSheet.create({
  containerStyle: {},
  input: {
    paddingVertical: 0,
    height: 48,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: Colors.charcoal,
    paddingHorizontal: 16,
  },
  textInputStyle: {
    flex: 1,
    color: "black",
    paddingVertical: 0,
    borderWidth: 0,
    paddingHorizontal: 10,
  },
  errorContainer: {
    height: 20,
    justifyContent: "center",
  },
  textError: {
    color: Colors.red,
    textAlignVertical: "center",
  },
  labelContainer: {
    height: 30,
  },
  label: {},
});
