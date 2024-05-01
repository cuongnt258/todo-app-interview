import React, { FC, useMemo } from "react";
import { StyleSheet, View } from "react-native";

import { Drawer, Header, Layout, TaskList } from "@components";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { CompositeScreenProps } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import { useAppDispatch, useAppSelector } from "@store";
import TaskUtils from "@utils/Task";

import { refDrawer } from "@components/Drawer";
import { refLoading } from "@components/common/Loading";

import { MainStackParamList, RootStackParamList } from "@constants/Navigation";

import useCompleteTask from "@hooks/useCompleteTask";

import { Task } from "@models/Task";

import { ProjectActions } from "@store/slices/projectSlice";

type InboxScreenProps = CompositeScreenProps<
  DrawerScreenProps<MainStackParamList, "Inbox">,
  StackScreenProps<RootStackParamList>
>;

const InboxScreen: FC<InboxScreenProps> = ({ navigation }) => {
  const dispatch = useAppDispatch();

  const {
    projectId,
    tasks = [],
    completedTasks = [],
    project,
  } = useAppSelector(({ inbox }) => inbox);

  const { isShowCompleted } = useAppSelector(({ setting }) => setting);

  const { setQueue } = useCompleteTask({
    tasks,
    completedTasks,
    isInbox: true,
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
    await dispatch(
      ProjectActions.getProjectData({ id: projectId, isInbox: true }),
    ).unwrap();
    _setLoading(false);
  };

  const _onCompleteTask = async (id: string, isComplete: boolean) => {
    setQueue((prev) => [...prev, { id, isComplete }]);
  };

  const _onPressMenu = () => {
    refDrawer.current?.openDrawer();
  };

  const _onPressAdd = () => {
    navigation.navigate("TaskForm", { project, childOrder: nextChildOrder });
  };

  const _onDeleteTask = async (id: string, isComplete: boolean) => {
    _setLoading(true);
    await dispatch(
      ProjectActions.deleteTask({ id, isComplete, isInbox: true }),
    );
    _setLoading(false);
  };

  const _onEditTask = (item: Task) => {
    navigation.navigate("TaskForm", { task: item, project });
  };

  return (
    <Drawer navigation={navigation}>
      <Layout>
        <Header
          title="Inbox"
          leftIconName="menu"
          isEnableLeftAction
          onPressLeft={_onPressMenu}
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
    </Drawer>
  );
};

export default InboxScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
