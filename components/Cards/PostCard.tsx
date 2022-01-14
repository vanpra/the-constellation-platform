import { useRouter } from "next/dist/client/router";
import { useCallback, useContext } from "react";
import LinkedPost from "../../models/LinkedPost";
import { UserContext } from "../../pages/_app";
import { deletePost } from "../../utils/supabase/db";
import { RedRoundedButton } from "../Buttons";
import { PostHeader } from "../Post/PostHeader";
import BaseCard from "./BaseCard";

interface PostCardProps {
  post: LinkedPost;
}

export default function PostCard(props: PostCardProps) {
  const { post } = props;

  const router = useRouter();
  const user = useContext(UserContext);
  const onClick = useCallback(() => {
    router.push(`/posts/${post.id}`);
  }, [router, post.id]);
  console.log(user);
  console.log(post.author.id);
  console.log(user?.id === post.author.id);
  return (
    <BaseCard onClick={onClick}>
      <PostHeader
        post={post}
        buttons={
          user?.id != undefined && user.id === post.author.id ? (
            <PostEditButtons post={post} />
          ) : (
            <></>
          )
        }
      />
      <div className="py-2">
        <hr className="border-gray-400 border-opacity-40 border-1"></hr>
      </div>
      <p className="text-2xl">{post.description}</p>
    </BaseCard>
  );
}

interface PostEditButtonsProps {
  post: LinkedPost;
}

const PostEditButtons = (props: PostEditButtonsProps) => {
  const { post } = props;
  const router = useRouter();

  return (
    <div className="flex flex-col gap-y-2 mb-2">
      <RedRoundedButton
        text="Edit"
        onClick={(e) => {
          e?.stopPropagation();
          router.push(`/posts/${post.id}/edit`);
        }}
      />
      <RedRoundedButton
        text="Delete"
        onClick={async (e) => {
          e?.stopPropagation();
          await deletePost(post);
          // Remove this once real-time updates are implemented
          window.location.reload();
        }}
      />
    </div>
  );
};
