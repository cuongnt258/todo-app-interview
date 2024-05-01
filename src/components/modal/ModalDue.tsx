import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { StyleSheet, View, useWindowDimensions } from "react-native";
import CalendarPicker, { ChangedDate } from "react-native-calendar-picker";
import ReactNativeModal from "react-native-modal";

import DateUtils from "@utils/Date";

import Colors from "@constants/Colors";

import { Due } from "@models/Task";

import ModalHeader from "./ModalHeader";

interface ModalDueProps {
  onSelect: (due: Due) => void;
}

export interface ModalDueHandle {
  show: (date?: string) => void;
  hide: () => void;
}

const ModalDue = forwardRef<ModalDueHandle, ModalDueProps>(
  ({ onSelect }, ref) => {
    const [isVisible, setVisible] = useState<boolean>(false);
    const [selected, setSelected] = useState<Date | string | undefined>(
      undefined,
    );

    const { width } = useWindowDimensions();

    const _showModal = (date?: string) => {
      setSelected(date);
      setVisible(true);
    };

    const _hideModal = () => {
      setVisible(false);
    };

    const _onHide = () => {
      if (selected) {
        onSelect(DateUtils.convertDateToDueObject(selected));
      }
      setSelected(undefined);
    };

    const _onSelectDate = (date: Date) => {
      setSelected(date);
      _hideModal();
    };

    useImperativeHandle(ref, () => ({
      show: _showModal,
      hide: _hideModal,
    }));

    function _renderHeader() {
      return (
        <View style={styles.headerContainer}>
          <ModalHeader iconName="calendar" title="Select Due" />
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
          <CalendarPicker
            allowRangeSelection={false}
            selectedDayColor={Colors.grape}
            onDateChange={_onSelectDate}
            selectedStartDate={selected}
            scaleFactor={375}
          />
        </View>
      </ReactNativeModal>
    );
  },
);

export default ModalDue;

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-end",
    alignItems: "center",
  },
  contentContainer: {
    padding: 10,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    margin: -20,
    backgroundColor: Colors.white,
    maxHeight: "82%",
  },
  headerContainer: {
    height: 54,
    borderBottomWidth: 1,
    borderColor: Colors.grey + "50",
  },
});
