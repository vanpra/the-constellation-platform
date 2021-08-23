import Post from "./Post";

export default interface PostsByTopic {
    topic: string;
    posts: Post[];
}