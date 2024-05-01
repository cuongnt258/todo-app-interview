import React, { FC, useMemo, useRef, useState } from "react";
import { Keyboard, StyleSheet, View } from "react-native";

import {
  Header,
  Input,
  LabelField,
  Layout,
  ModalDue,
  ModalPriority,
  SaveButton,
} from "@components";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { CompositeScreenProps } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import { useAppDispatch } from "@store";

import { refLoading } from "@components/common/Loading";
import { ModalDueHandle } from "@components/modal/ModalDue";
import { ModalPriorityHandle } from "@components/modal/ModalPriority";

import { MainStackParamList, RootStackParamList } from "@constants/Navigation";

import { Due } from "@models/Task";

import LocalizationService from "@services/Localization";

import { ProjectActions } from "@store/slices/projectSlice";

type TaskFormScreenProps = CompositeScreenProps<
  DrawerScreenProps<MainStackParamList, "TaskForm">,
  StackScreenProps<RootStackParamList>
>;

const TaskFormScreen: FC<TaskFormScreenProps> = ({ navigation, route }) => {
  const { translations } = LocalizationService || {};

  const dispatch = useAppDispatch();

  const { task, project, childOrder = 0 } = route.params || {};

  const refModalPriority = useRef<ModalPriorityHandle>(null);
  const refModalDue = useRef<ModalDueHandle>(null);

  const {
    id,
    content: taskContent = "",
    due: taskDue,
    priority: taskPriority = "",
    description: taskDescription = "",
  } = task || {};

  const { id: projectId, inbox_project = false } = project || {};

  const [content, setContent] = useState<string>(taskContent);
  const [description, setDescription] = useState<string>(taskDescription);
  const [due, setDue] = useState<Due | undefined>(taskDue);
  const [priority, setPriority] = useState<number | string>(taskPriority);

  const isInValid = !description || !content;
  const isEdit = !!id;

  const dueValue = useMemo(() => {
    return due?.string ?? "";
  }, [due]);

  const _setLoading = (isLoading: boolean = false) => {
    refLoading.current?.setLoading(isLoading);
  };

  const _hideKeyboard = () => {
    Keyboard.dismiss();
  };

  const _onPressBack = () => {
    navigation.goBack();
  };

  const _onPressSave = async () => {
    _hideKeyboard();

    _setLoading(true);

    if (isEdit) {
      await dispatch(
        ProjectActions.updateTask({
          id,
          content,
          description,
          isInbox: inbox_project,
        }),
      ).unwrap();
    } else {
      await dispatch(
        ProjectActions.createTask({
          content,
          description,
          due,
          priority: Number(priority ?? 4),
          isInbox: inbox_project,
          projectId,
          childOrder,
        }),
      ).unwrap();
    }

    _setLoading(false);
    navigation.goBack();
  };

  const _renderSaveButton = () => {
    return <SaveButton onPress={_onPressSave} isDisabled={isInValid} />;
  };

  const _onChangeTextContent = (value: string) => {
    setContent(value);
  };

  const _onChangeTextDescription = (value: string) => {
    setDescription(value);
  };

  const _onPressDue = () => {
    _hideKeyboard();
    refModalDue.current?.show(
      due ? new Date(due.date).toISOString() : undefined,
    );
  };

  const _onPressPriority = () => {
    _hideKeyboard();
    refModalPriority.current?.show();
  };

  const _onSelectPriority = (value: number) => {
    setPriority(value);
  };

  const _onSelectDue = (due: Due) => {
    setDue(due);
  };

  return (
    <Layout>
      <Header
        title={id ? translations.editTask : translations.addTask}
        onPressLeft={_onPressBack}
        isEnableRightAction
        rightAction={_renderSaveButton()}
      />
      <View style={styles.container}>
        <Input
          value={content}
          isEnableLeftIcon
          leftIconName="hash"
          placeholder={translations.taskName}
          onChangeText={_onChangeTextContent}
        />
        <Input
          value={description}
          isEnableLeftIcon
          leftIconName="align-left"
          placeholder={translations.taskDescription}
          onChangeText={_onChangeTextDescription}
        />
        {!isEdit && (
          <>
            <LabelField
              isEnableLeftIcon
              leftIconName="calendar"
              value={dueValue}
              placeholder={translations.taskDue}
              onPress={_onPressDue}
            />
            <LabelField
              isEnableLeftIcon
              leftIconName="flag"
              value={priority ? `Priority ${priority}` : ""}
              placeholder={translations.taskPriority}
              onPress={_onPressPriority}
            />
            <ModalPriority
              ref={refModalPriority}
              onSelect={_onSelectPriority}
            />
            <ModalDue ref={refModalDue} onSelect={_onSelectDue} />
          </>
        )}
      </View>
    </Layout>
  );
};

export default TaskFormScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
