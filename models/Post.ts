export default interface Post {
  id?: number;
  user_id: string;
  topic_id: number;
  title: string;
  description: string;
  content: string;
  views?: number;
  previous_salt_post_id?: number;
  created_at?: Date;
  salt_stage?: number;
  tags?: string[];
}
