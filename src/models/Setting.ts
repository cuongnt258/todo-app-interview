export interface Filter {
  color: string;
  id: string;
  is_deleted: boolean;
  is_favorite: boolean;
  item_order: number;
  name: string;
  query: string;
}

export interface Label {
  color: string;
  id: string;
  is_deleted: boolean;
  is_favorite: boolean;
  item_order: number;
  name: string;
}

export interface DaysItem {
  date: string;
  total_completed: number;
}

export interface WeekItem {
  from: string;
  to: string;
  total_completed: number;
}

export interface Stats {
  completed_count: number;
  days_items: DaysItem[];
  week_items: WeekItem[];
}

export interface User {
  auto_reminder: number;
  avatar_big: string;
  avatar_medium: string;
  avatar_s640: string;
  avatar_small: string;
  business_account_id: any;
  daily_goal: number;
  date_format: number;
  days_off: number[];
  email: string;
  feature_identifier: string;
  features: Features;
  full_name: string;
  has_password: boolean;
  id: string;
  image_id: string;
  inbox_project_id: string;
  is_biz_admin: boolean;
  is_celebrations_enabled: boolean;
  is_premium: boolean;
  joinable_workspace: any;
  joined_at: string;
  karma: number;
  karma_trend: string;
  lang: string;
  mfa_enabled: boolean;
  next_week: number;
  premium_status: string;
  premium_until: any;
  share_limit: number;
  sort_order: number;
  start_day: number;
  start_page: string;
  theme_id: string;
  time_format: number;
  tz_info: TzInfo;
  unique_prefix: number;
  verification_status: string;
  websocket_url: string;
  weekend_start_day: number;
  weekly_goal: number;
}

export interface Features {
  beta: number;
  dateist_inline_disabled: boolean;
  dateist_lang: any;
  "global.teams": boolean;
  has_push_reminders: boolean;
  karma_disabled: boolean;
  karma_vacation: boolean;
  kisa_consent_timestamp: any;
  restriction: number;
}

export interface TzInfo {
  gmt_string: string;
  hours: number;
  is_dst: number;
  minutes: number;
  timezone: string;
}
