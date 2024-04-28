import React, {ReactNode} from 'react';

import {
  NavigationContainer as RNNavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import {RootStackParamList} from '../constants/Navigation';

type Props = {
  children: ReactNode;
};

export default function NavigationContainer({children}: Props) {
  const navigationRef = useNavigationContainerRef<RootStackParamList>();

  return (
    <RNNavigationContainer ref={navigationRef}>
      {children}
    </RNNavigationContainer>
  );
}
