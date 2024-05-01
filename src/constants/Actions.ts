export enum ActionType {
  DEFAULT = 0,
  EDIT = 1,
  DELETE = 2,
}

export interface Action {
  type: ActionType;
  name: string;
}

export const RenderActions: Action[] = [
  {
    type: ActionType.EDIT,
    name: "Edit",
  },
  {
    type: ActionType.DELETE,
    name: "Delete",
  },
];
