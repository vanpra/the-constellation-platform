import { useRouter } from "next/dist/client/router";
import { useCallback } from "react";
import Post from "../../models/Post";
import { PostHeader } from "../Post/PostHeader";
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
      <PostHeader post={post} />

      <div className="py-2">
        <hr className="border-gray-400 border-opacity-40 border-1"></hr>
      </div>
      
      <p>{post.description}</p>
    </BaseCard>
  );
}
