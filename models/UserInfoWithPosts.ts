import LinkedPost from "./LinkedPost";
import UserInfo from "./UserInfo";

export default interface UserInfoWithPosts extends UserInfo {
  posts: LinkedPost[];
}
