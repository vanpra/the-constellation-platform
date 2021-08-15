import Post from "../../models/Post";
import BaseCard from "./BaseCard";

interface PostCardProps {
  post: Post;
}

export default function PostCard(props: PostCardProps) {
  const { post } = props;

  return (
    <BaseCard>
      <p>{post.title}</p>
      <p>{post.description}</p>
    </BaseCard>
  );
}
