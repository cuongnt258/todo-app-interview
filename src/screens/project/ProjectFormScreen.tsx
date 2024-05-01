import React, { FC, useState } from "react";
import { Keyboard, StyleSheet, View } from "react-native";

import { Header, Input, Layout, SaveButton } from "@components";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { CompositeScreenProps } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import { useAppDispatch } from "@store";

import { refDrawer } from "@components/Drawer";
import { refLoading } from "@components/common/Loading";

import { MainStackParamList, RootStackParamList } from "@constants/Navigation";

import LocalizationService from "@services/Localization";

import { SettingActions } from "@store/slices/settingSlice";

type ProjectFormScreenProps = CompositeScreenProps<
  DrawerScreenProps<MainStackParamList, "ProjectForm">,
  StackScreenProps<RootStackParamList>
>;

const ProjectFormScreen: FC<ProjectFormScreenProps> = ({
  navigation,
  route,
}) => {
  const dispatch = useAppDispatch();

  const { project, childOrder } = route.params || {};

  const { id, name: projectName = "" } = project || {};

  const [name, setName] = useState<string>(projectName);

  const { translations } = LocalizationService || {};

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

    if (id) {
      await dispatch(SettingActions.updateProject({ id, name }));
    } else {
      await dispatch(
        SettingActions.createProject({ name, childOrder: childOrder }),
      );
    }

    _setLoading(false);
    navigation.goBack();
    refDrawer.current?.openDrawer();
  };

  const _renderSaveButton = () => {
    return <SaveButton onPress={_onPressSave} isDisabled={!name} />;
  };

  const _onChangeTextName = (value: string) => {
    setName(value);
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
          value={name}
          isEnableLeftIcon
          leftIconName="hash"
          placeholder={translations.projectName}
          onChangeText={_onChangeTextName}
        />
      </View>
    </Layout>
  );
};

export default ProjectFormScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
