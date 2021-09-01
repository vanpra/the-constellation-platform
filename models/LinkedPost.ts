import Post from "./Post";
import UserInfo from "./UserInfo";

export default interface LinkedPost extends Post {
  author: UserInfo;
  prev_salt_post?: { id: number; title: string };
  next_salt_post?: { id: number; title: string };
}
