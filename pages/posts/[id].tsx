import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import React, { useCallback } from "react";
import { RedRoundedButton, TransparentRoundedButton } from "../../components/Buttons";
import PostCard from "../../components/Cards/PostCard";
import LoadingSpinner from "../../components/Loading";
import ErrorDataScaffold from "../../components/Scaffolds/ErrorDataScaffold";
import PageScaffold from "../../components/Scaffolds/PageScaffold";
import { usePost } from "../../utils/db";

export default function Post() {
  const router = useRouter();
  const { id } = router.query;
  const { error, post } = usePost(id);

  const prevPostOnClick = useCallback(() => {
    router.push(`/posts/${post?.prev_salt_post?.id}`);
  }, [router, post?.prev_salt_post?.id]);

  return (
    <>
      <ErrorDataScaffold error={error} data={post}>
        <PageScaffold>
          <TransparentRoundedButton
            className="mr-6 bg-white"
            text="Translate"
            onClick={() => { console.log("translate"); }}
          />
          <p>
            Post Header (as own component) with title, views, profile pic, author, date posted
            {post?.title} {post?.views} view(s). Posted by {post?.author?.full_name}, on {post?.created_at}
          </p>
          
          <p>
            {post?.description}
          </p>

          Salt stage component
          <RedRoundedButton className="mr-2" onClick={prevPostOnClick} text={post?.prev_salt_post?.title || ""} />
          <p>
            Salt stage {post?.salt_stage}
          </p>

          {post?.content}

          <p className="text-2xl">
            Discussion component
          </p>
        </PageScaffold>
      </ErrorDataScaffold>
    </>
  );
}
