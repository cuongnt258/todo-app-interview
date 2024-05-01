import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import ReactNativeModal from "react-native-modal";

import Colors from "@constants/Colors";
import { Priority, RenderPriorities } from "@constants/Priority";

import ModalHeader from "./ModalHeader";

interface ModalPriorityProps {
  onSelect?: (priority: number) => void;
}

export interface ModalPriorityHandle {
  show: () => void;
  hide: () => void;
}

const ModalPriority = forwardRef<ModalPriorityHandle, ModalPriorityProps>(
  ({ onSelect }, ref) => {
    const refSelected = useRef<number>(-1);

    const [isVisible, setVisible] = useState<boolean>(false);

    const { width } = useWindowDimensions();

    const _showModal = () => {
      setVisible(true);
    };

    const _hideModal = () => {
      setVisible(false);
    };

    const _onHide = () => {
      refSelected.current !== -1 && onSelect && onSelect(refSelected.current);
      refSelected.current = -1;
    };

    const _renderItem = (priority: Priority) => {
      const { type, name } = priority || {};

      return (
        <TouchableOpacity
          key={type}
          style={styles.button}
          onPress={() => {
            refSelected.current = type;
            _hideModal();
          }}
        >
          <Text style={styles.text}>{name}</Text>
        </TouchableOpacity>
      );
    };

    useImperativeHandle(ref, () => ({
      show: _showModal,
      hide: _hideModal,
    }));

    function _renderHeader() {
      return (
        <View style={styles.headerContainer}>
          <ModalHeader iconName="flag" title="Select Priority" />
        </View>
      );
    }

    return (
      <ReactNativeModal
        style={styles.container}
        isVisible={isVisible}
        onModalHide={_onHide}
        onBackdropPress={_hideModal}
        backdropOpacity={0.8}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        animationInTiming={300}
        animationOutTiming={300}
        hideModalContentWhileAnimating
        onSwipeComplete={_hideModal}
        supportedOrientations={["portrait", "landscape"]}
        propagateSwipe
        useNativeDriverForBackdrop
        statusBarTranslucent
        coverScreen
        avoidKeyboard
      >
        <View style={[styles.contentContainer, { width }]}>
          {_renderHeader()}
          {RenderPriorities.map(_renderItem)}
        </View>
      </ReactNativeModal>
    );
  },
);

export default ModalPriority;

const styles = StyleSheet.create({
  container: {
    margin: 0,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  contentContainer: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: Colors.white,
    maxHeight: "82%",
    maxWidth: 500,
  },
  headerContainer: {
    height: 54,
    borderBottomWidth: 1,
    borderColor: Colors.grey + "50",
  },
  button: {
    alignItems: "flex-start",
    paddingLeft: 12,
    paddingRight: 4,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: Colors.grey + "50",
  },
  text: {
    fontWeight: "500",
    lineHeight: 20,
    color: Colors.grape,
  },
});
