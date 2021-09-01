import { useRouter } from "next/dist/client/router";
import { useCallback } from "react";
import LinkedPost from "../../models/LinkedPost";
import { PostHeader } from "../Post/PostHeader";
import BaseCard from "./BaseCard";

interface PostCardProps {
  post: LinkedPost;
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

      <p className="text-2xl">{post.description}</p>
    </BaseCard>
  );
}
