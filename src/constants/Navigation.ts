import { NavigatorScreenParams, PathConfigMap } from "@react-navigation/native";

import { Project } from "@models/Project";
import { Task } from "@models/Task";

export const SCREENS = {} as const satisfies {
  [key: string]: React.ComponentType<{}> & {
    title: string;
    linking: object | undefined;
    options?: object;
  };
};

export type MainStackParamList = {
  Inbox: undefined;
  Todo: undefined;
  TaskForm: {
    task?: Task;
    project?: Project;
    childOrder?: number;
  };
  ProjectForm: {
    project?: Project;
    childOrder?: number;
  };
  Project: {
    project: Project;
  };
};

type ExampleScreensParamList = {
  [Key in keyof typeof SCREENS]: (typeof SCREENS)[Key]["linking"] extends PathConfigMap<
    infer P
  >
    ? NavigatorScreenParams<P> | undefined
    : undefined;
};

export type RootStackParamList = ExampleScreensParamList & {
  Splash: undefined;
  MainStack: NavigatorScreenParams<MainStackParamList> | undefined;
};
