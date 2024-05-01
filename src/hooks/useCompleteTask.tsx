import { useEffect, useRef, useState } from "react";

import { useAppDispatch } from "@store";

import { Task } from "@models/Task";

import { ProjectActions } from "@store/slices/projectSlice";

export type TaskQueue = {
  id: string;
  isComplete: boolean;
};

type HookCompleteTask = {
  tasks: Task[];
  completedTasks: Task[];
  isInbox?: boolean;
};

const useCompleteTask = (value: HookCompleteTask) => {
  const dispatch = useAppDispatch();

  const [queue, setQueue] = useState<TaskQueue[]>([]);
  const refIsRequesting = useRef<boolean>(false);
  const refIsStop = useRef<boolean>(false);

  const { tasks = [], completedTasks = [], isInbox = false } = value || {};

  useEffect(() => {
    continueQuery();
  }, [queue]);

  const continueQuery = (): void => {
    if (refIsRequesting.current || !queue.length || refIsStop.current) {
      refIsStop.current = false;
      return;
    }

    _completeTask(queue[0]);
  };

  const _completeTask = async (queue: TaskQueue) => {
    refIsRequesting.current = true;

    const { id, isComplete } = queue || {};

    const isValidQueue = isComplete
      ? tasks.some((task: Task) => task.id === id)
      : completedTasks.some((task: Task) => task.id === id);

    if (isValidQueue) {
      const updatedItem = isComplete
        ? await dispatch(ProjectActions.completeTask({ id, isInbox }))
        : await dispatch(ProjectActions.unCompleteTask({ id, isInbox }));

      if (!updatedItem) {
        refIsStop.current = true;
      }
    }

    _removeFirstQueue();
  };

  const _removeFirstQueue = () => {
    refIsRequesting.current = false;
    setQueue((prev) => prev.slice(1));
  };

  const _stopQueue = (value: boolean = true) => {
    refIsStop.current = value;
  };

  return { setQueue, stopQueue: _stopQueue };
};

export default useCompleteTask;
