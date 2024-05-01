import { createRef, forwardRef, useImperativeHandle } from "react";

import { useAppDispatch } from "@store";

type ActionBase<T = any> = {
  type: string;
  payload?: T;
};

type RXStoreType = {
  dispatch: (action: any) => any;
};

const refRXStore = createRef<RXStoreType>();

export const RXStoreComponent = forwardRef(() => {
  const dispatchRx = useAppDispatch();

  useImperativeHandle(refRXStore, () => ({
    dispatch: (action: ActionBase) => {
      dispatchRx(action);
    },
  }));

  return null;
});

export const dispatch = (action: any): any => {
  refRXStore.current?.dispatch(action);
};
