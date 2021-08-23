import { useRouter } from "next/dist/client/router";
import { useCallback } from "react";
import Post from "../../models/Post";
import BaseCard from "./BaseCard";

interface PostCardProps {
  post: Post;
}

export default function PostCard(props: PostCardProps) {
  const { post } = props;

  const router = useRouter();

  const onClick = useCallback(() => {
    router.push(`/posts/${post.id}`);
  }, [router, post.id]);

  return (
    <BaseCard onClick={onClick}>
      <p className="text-4xl font-medium">{post.title}</p>
      <p>{post.description}</p>
    </BaseCard>
  );
}
