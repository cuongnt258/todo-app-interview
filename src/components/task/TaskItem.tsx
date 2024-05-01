import React, { FC, useMemo, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";

import ColorUtils from "@utils/Color";
import DateUtils from "@utils/Date";

import Colors from "@constants/Colors";

import { Task } from "@models/Task";

type TaskItemProps = Task & {
  onCheck: (id: string, isCheck: boolean, onCancel: () => void) => void;
  onPress: (item: Task) => void;
};

const TaskItem: FC<TaskItemProps> = ({ onPress, onCheck, ...item }) => {
  const [isLoading, setLoading] = useState<boolean>(false);

  const { checked, added_at, content, description, id, priority, due } =
    item || {};
  const { date } = due || {};

  const color = useMemo(
    () => ColorUtils.getPriorityColor(priority),
    [priority],
  );

  const _onPressCheckbox = () => {
    setLoading(true);
    onCheck(id, !checked, () => {
      setLoading(false);
    });
  };

  const _onPressTask = () => {
    onPress(item);
  };

  return (
    <TouchableOpacity
      disabled={isLoading}
      style={[styles.container, { borderColor: color }]}
      onPress={_onPressTask}
    >
      <View style={styles.header}>
        <View style={styles.headerText}>
          <Text style={styles.textContent}>{content}</Text>
          <Text style={styles.textAddedDate}>
            {DateUtils.formatDate(added_at)} {date ? `- ${date}` : ""}
          </Text>
        </View>
        <TouchableOpacity
          disabled={isLoading}
          style={[styles.doneButton, checked && styles.activeDoneButton]}
          onPress={_onPressCheckbox}
        >
          {isLoading ? (
            <ActivityIndicator color={checked ? Colors.white : Colors.grape} />
          ) : (
            <>
              <Icon
                name={checked ? "check-circle" : "circle"}
                size={16}
                color={checked ? Colors.white : Colors.grape}
              />
              <Text style={[styles.textDone, checked && styles.activeTextDone]}>
                Done
              </Text>
            </>
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Text
          style={[
            styles.textDescription,
            checked && styles.activeTextDescription,
          ]}
        >
          {description}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default TaskItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    marginHorizontal: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.grey,
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 3,
    marginBottom: 16,
    padding: 8,
  },
  header: {
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
  },
  headerText: {
    flex: 1,
  },
  textContent: {
    color: Colors.black,
    fontWeight: "500",
  },
  textAddedDate: {
    fontWeight: "400",
    color: Colors.grey,
  },
  doneButton: {
    width: 72,
    height: 32,
    paddingHorizontal: 8,
    paddingVertical: 4,

    borderRadius: 4,
    borderWidth: 1,

    borderColor: Colors.grape,
    marginLeft: 8,

    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.white,
  },
  activeDoneButton: {
    borderColor: Colors.grape,
    backgroundColor: Colors.grape,
  },
  textDone: {
    marginLeft: 8,
    fontWeight: "400",
    color: Colors.grape,
  },
  activeTextDone: {
    color: Colors.white,
  },
  content: {
    marginTop: 8,
  },
  textDescription: {
    fontWeight: "400",
    color: Colors.black,
  },
  activeTextDescription: {
    textDecorationLine: "line-through",
  },
});
