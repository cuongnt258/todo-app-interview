export enum PriorityType {
  HIGH = 1,
  MEDIUM = 2,
  LOW = 3,
  DEFAULT = 4,
}

export interface Priority {
  type: PriorityType;
  name: string;
}

export const RenderPriorities: Priority[] = [
  {
    type: PriorityType.HIGH,
    name: "Priority 1",
  },
  {
    type: PriorityType.MEDIUM,
    name: "Priority 2",
  },
  {
    type: PriorityType.LOW,
    name: "Priority 3",
  },
  {
    type: PriorityType.DEFAULT,
    name: "Priority 4",
  },
];
