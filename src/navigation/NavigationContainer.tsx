import React, { ReactNode } from "react";

import {
  NavigationContainer as RNNavigationContainer,
  createNavigationContainerRef,
} from "@react-navigation/native";
import { useAppSelector } from "@store";

import type { RootStackParamList } from "@constants/Navigation";

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

type Props = {
  children: ReactNode;
};

const DialogService = () => {
  const {} = useAppSelector(({}) => DialogService);
};

export default function NavigationContainer({ children }: Props) {
  return (
    <RNNavigationContainer ref={navigationRef}>
      {children}
    </RNNavigationContainer>
  );
}
