import { useRouter } from "next/dist/client/router";
import React, { useCallback } from "react";
import LinkedPost from "../../models/LinkedPost";
import Avatar from "../Avatar/Avatar";
import { PostHeader } from "../Post/PostHeader";
import BaseCard from "./BaseCard";

interface PostKnowledgeCardProps {
  post: LinkedPost;
}

export default function PostKnowledgeCard(props: PostKnowledgeCardProps) {
  const { post } = props;

  const router = useRouter();

  const onClick = useCallback(() => {
    router.push(`/posts/${post.id}`);
  }, [router, post.id]);

  return (
    <BaseCard onClick={onClick}>
      <div className="flex flex-row  items-center">
        <Avatar
          className="w-12 h-12 mr-2"
          avatarUrl={post?.author?.avatar_url}
          name={post?.author?.full_name}
          onClick={() => router.push(`/profile/${post?.user_id}`)}
        />
        <p className="text-xl font-normal">
          {post?.author?.full_name + " on " + post?.title}
        </p>
      </div>
      
      <ul className="pt-5 list-disc list-inside ml-4">
        {post.knowledge_asset?.map((knowledge, index) => (
          <li key={index} className="text-lg">
            {knowledge}
          </li>
        ))}
      </ul>
    </BaseCard>
  );
}
