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

import { Action, ActionType, RenderActions } from "@constants/Actions";
import Colors from "@constants/Colors";

import ModalHeader from "./ModalHeader";

interface ModalActionProps {
  isCompleted?: boolean;
  name?: string;
  onEdit: () => void;
  onDelete: () => void;
}

export interface ModalActionHandle {
  show: () => void;
  hide: () => void;
}

const ModalAction = forwardRef<ModalActionHandle, ModalActionProps>(
  ({ isCompleted = false, name = "", onEdit, onDelete }, ref) => {
    const refAction = useRef<ActionType>(0);

    const [isVisible, setVisible] = useState<boolean>(false);

    const { width } = useWindowDimensions();

    const _showModal = () => {
      setVisible(true);
    };

    const _hideModal = () => {
      setVisible(false);
    };

    const _onHide = () => {
      switch (refAction.current) {
        case ActionType.EDIT:
          onEdit();
          break;

        case ActionType.DELETE:
          onDelete();
          break;

        default:
          break;
      }

      refAction.current = 0;
    };

    useImperativeHandle(ref, () => ({
      show: _showModal,
      hide: _hideModal,
    }));

    const _renderItem = (action: Action) => {
      const { type, name } = action || {};
      const isDelete = type === ActionType.DELETE;
      const isEdit = type === ActionType.EDIT;

      if (isEdit && isCompleted) return null;

      return (
        <TouchableOpacity
          key={type}
          style={styles.button}
          onPress={() => {
            refAction.current = type;
            _hideModal();
          }}
        >
          <Text style={[styles.text, isDelete && styles.textDelete]}>
            {name}
          </Text>
        </TouchableOpacity>
      );
    };

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
          <View style={styles.headerContainer}>
            <ModalHeader title={name} />
          </View>
          {RenderActions.map(_renderItem)}
        </View>
      </ReactNativeModal>
    );
  },
);

export default ModalAction;

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
    paddingLeft: 16,
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
  textDelete: {
    color: Colors.red,
  },
});
