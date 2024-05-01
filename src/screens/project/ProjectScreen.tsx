import React, { FC, useMemo } from "react";
import { StyleSheet, View } from "react-native";

import { Header } from "@components";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { CompositeScreenProps } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import { useAppDispatch, useAppSelector } from "@store";
import TaskUtils from "@utils/Task";

import Layout from "@components/common/Layout";
import { refLoading } from "@components/common/Loading";
import TaskList from "@components/task/TaskList";

import { MainStackParamList, RootStackParamList } from "@constants/Navigation";

import useCompleteTask from "@hooks/useCompleteTask";

import { Task } from "@models/Task";

import LocalizationService from "@services/Localization";

import { ProjectActions } from "@store/slices/projectSlice";

type ProjectScreenProps = CompositeScreenProps<
  DrawerScreenProps<MainStackParamList, "Project">,
  StackScreenProps<RootStackParamList>
>;

const ProjectScreen: FC<ProjectScreenProps> = ({ navigation, route }) => {
  const { translations } = LocalizationService || {};

  const dispatch = useAppDispatch();

  const { tasks = [], completedTasks = [] } = useAppSelector(
    ({ project }) => project,
  );
  const { isShowCompleted } = useAppSelector(({ setting }) => setting);

  const { project } = route.params || {};
  const { id: projectId, name } = project || {};

  const { setQueue } = useCompleteTask({
    tasks,
    completedTasks,
  });

  const { renderTasks, nextChildOrder } = useMemo(
    () => TaskUtils.sortTasks(tasks, completedTasks, isShowCompleted),
    [tasks, completedTasks, isShowCompleted],
  );

  const _setLoading = (isLoading: boolean = false) => {
    refLoading.current?.setLoading(isLoading);
  };

  const _fetchData = async () => {
    _setLoading(true);
    await dispatch(ProjectActions.getProjectData({ id: projectId })).unwrap();
    _setLoading(false);
  };

  const _onCompleteTask = async (id: string, isComplete: boolean) => {
    setQueue((prev) => [...prev, { id, isComplete }]);
  };

  const _onPressBack = () => {
    navigation.goBack();
  };

  const _onPressAdd = () => {
    navigation.navigate("TaskForm", { project, childOrder: nextChildOrder });
  };

  const _onDeleteTask = async (id: string, isComplete: boolean) => {
    _setLoading(true);
    await dispatch(ProjectActions.deleteTask({ id, isComplete }));
    _setLoading(false);
  };

  const _onEditTask = (item: Task) => {
    navigation.navigate("TaskForm", { task: item, project });
  };

  return (
    <Layout>
      <Header
        title={`${name}'s ${translations.tasks}`}
        onPressLeft={_onPressBack}
        isEnableRightAction
        rightIconName="plus"
        onPressRight={_onPressAdd}
      />
      <View style={styles.container}>
        <TaskList
          data={renderTasks}
          fetchData={_fetchData}
          onCompleteTask={_onCompleteTask}
          onDeleteTask={_onDeleteTask}
          onEditTask={_onEditTask}
        />
      </View>
    </Layout>
  );
};

export default ProjectScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    marginVertical: 8,
  },
});
