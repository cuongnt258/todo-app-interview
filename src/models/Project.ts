export type ViewStyle = "list" | "kanban" | "board";

export interface Project {
  can_assign_tasks: boolean;
  child_order: number;
  collapsed: boolean;
  color: string;
  created_at: string;
  id: string;
  inbox_project?: boolean;
  is_archived: boolean;
  is_deleted: boolean;
  is_favorite: boolean;
  name: string;
  parent_id: any;
  shared: boolean;
  sync_id: any;
  updated_at: string;
  v2_id: string;
  view_style: ViewStyle;
}

export interface Section {
  added_at: string;
  archived_at: any;
  collapsed: boolean;
  id: string;
  is_archived: boolean;
  is_deleted: boolean;
  name: string;
  project_id: string;
  section_order: number;
  sync_id: any;
  user_id: string;
  v2_id: string;
  v2_project_id: string;
}
