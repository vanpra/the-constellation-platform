import { SaltStage } from "../utils/salt";
import Topic from "./Topic";

export default interface Post {
  id?: number;
  user_id: string;
  topic_id: number;
  title: string;
  description: string;
  content: string;
  views?: number;
  previous_salt_post_id?: number;
  next_salt_post_id?: number;
  created_at?: Date;
  salt_stage?: number;
  tags?: string[];
  knowledge_asset?: string[];
}

export interface InternalPost {
  title: string;
  description: string;
  content: string;
  topic?: Topic;
  saltStage: SaltStage;
  previousPost: { id: number; title: string } | undefined;
  tags: string[];
  knowledgeAssets: string[];
}
