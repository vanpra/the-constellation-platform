import UserInfo from "./UserInfo";

export default interface Post {
  id: number;
  title: string;
  description: string;
  content: string;
  views: number;
  created_at: string; // TODO: make this a date time object (factoring in timezone)
  salt_stage?: number;
  author?: UserInfo;
  prev_salt_post?: {id: number, title: string};
}
