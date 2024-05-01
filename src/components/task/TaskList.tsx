import React, { FC, useEffect, useRef, useState } from "react";
import { FlatList, StyleSheet } from "react-native";

import ModalAction, { ModalActionHandle } from "@components/modal/ModalAction";

import { Task } from "@models/Task";

import TaskItem from "./TaskItem";

interface TaskListProps {
  isInbox?: boolean;
  data: Task[];
  fetchData: () => void;
  onCompleteTask: (id: string, isComplete: boolean) => void;
  onDeleteTask: (id: string, isComplete: boolean) => void;
  onEditTask: (item: Task) => void;
}

const TaskList: FC<TaskListProps> = (props) => {
  const { fetchData, data, onCompleteTask, onDeleteTask, onEditTask } =
    props || {};
  const [selected, setSelected] = useState<Task | null>(null);
  const refModalAction = useRef<ModalActionHandle>(null);

  const { id, content, checked = false } = selected || {};

  const _handleSelectTask = (item: Task) => {
    setSelected(item);
    refModalAction.current?.show();
  };

  const _handleDeleteTask = () => {
    if (!id) return;
    onDeleteTask(id, checked);
  };

  const _handleEditTask = () => {
    if (!selected) return;
    onEditTask(selected);
  };

  const _renderItem = ({ item }: { item: Task }) => {
    return (
      <TaskItem
        {...item}
        onCheck={onCompleteTask}
        onPress={_handleSelectTask}
      />
    );
  };

  const _getKeyExtractor = (item: Task, index: number) => {
    return `${item?.id}-${index} `;
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <FlatList
        contentContainerStyle={styles.listContainer}
        refreshing={false}
        onRefresh={fetchData}
        data={data}
        renderItem={_renderItem}
        keyExtractor={_getKeyExtractor}
      />

      <ModalAction
        ref={refModalAction}
        isCompleted={checked}
        name={content}
        onDelete={_handleDeleteTask}
        onEdit={_handleEditTask}
      />
    </>
  );
};

export default TaskList;

const styles = StyleSheet.create({
  listContainer: {
    marginVertical: 8,
  },
});
