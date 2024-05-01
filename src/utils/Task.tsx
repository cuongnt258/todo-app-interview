import { Task } from "@models/Task";

const sortTasks = (
  tasks: Task[],
  completedTasks: Task[],
  isShowCompleted: boolean,
) => {
  const sortedTasks = [...tasks].sort((a: Task, b: Task): number => {
    return a.child_order - b.child_order;
  });

  const sortedCompletedTasks = [...completedTasks].sort(
    (a: Task, b: Task): number => {
      return (
        new Date(b.completed_at).getTime() - new Date(a.completed_at).getTime()
      );
    },
  );

  return {
    sortedTasks,
    sortedCompletedTasks,
    renderTasks: sortedTasks.concat(isShowCompleted ? completedTasks : []),
    nextChildOrder:
      (sortedTasks[sortedTasks.length - 1]?.child_order ?? -1) + 1,
  };
};

const generateRandomId = () => {
  let randomNum: number = Math.floor(Math.random() * Math.pow(10, 13));
  return `_${randomNum.toString().padStart(13, "0")}`;
};

const TaskUtils = { sortTasks, generateRandomId };

export default TaskUtils;
