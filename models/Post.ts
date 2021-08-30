import UserInfo from "./UserInfo";

export default interface Post {
  id?: number;
  title: string;
  description: string;
  content: string;
  views: number;
  previous_salt_post_id?: number;
  created_at: Date;
  salt_stage?: number;
  user_id: string;
  author?: UserInfo;
  prev_salt_post?: { id: number; title: string };
  next_salt_post?: { id: number; title: string };
}
