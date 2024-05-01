export interface Due {
  date: string;
  is_recurring: boolean;
  lang: string;
  string: string;
  timezone: any;
}

export interface Task {
  added_at: string;
  added_by_uid: string;
  assigned_by_uid: any;
  checked: boolean;
  child_order: number;
  collapsed: boolean;
  completed_at: any;
  content: string;
  day_order: number;
  description: string;
  due?: Due;
  duration: any;
  id: string;
  is_deleted: boolean;
  labels: string[];
  parent_id: any;
  priority: number;
  project_id: string;
  responsible_uid: any;
  section_id?: string;
  sync_id: any;
  updated_at: string;
  user_id: string;
  v2_id: string;
  v2_parent_id: any;
  v2_project_id: string;
  v2_section_id?: string;
}

export interface CompleteTask {
  completed_at: string;
  content: string;
  id: string;
  item_object: Task;
  meta_data: any;
  note_count: number;
  notes: any[];
  project_id: string;
  section_id: any;
  task_id: string;
  user_id: string;
}
