import {NavigatorScreenParams, PathConfigMap} from '@react-navigation/native';

export const SCREENS = {} as const satisfies {
  [key: string]: React.ComponentType<{}> & {
    title: string;
    linking: object | undefined;
    options?: object;
  };
};

export type MainStackParamList = {
  Dashboard: undefined;
  Todo: undefined;
};

type ExampleScreensParamList = {
  [Key in keyof typeof SCREENS]: (typeof SCREENS)[Key]['linking'] extends PathConfigMap<
    infer P
  >
    ? NavigatorScreenParams<P> | undefined
    : undefined;
};

export type RootStackParamList = ExampleScreensParamList & {
  Splash: undefined;
  Main: NavigatorScreenParams<MainStackParamList> | undefined;
};
