import Post from "./Post";
import UserInfo from "./UserInfo";

export default interface UserInfoWithPosts extends UserInfo {
  posts: Post[];
}
