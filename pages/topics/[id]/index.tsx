import { useRouter } from "next/dist/client/router";
import React from "react";
import { RedRoundedButton } from "../../../components/Buttons";
import PostCard from "../../../components/Cards/PostCard";
import ErrorDataLayout from "../../../components/Scaffolds/ErrorDataScaffold";
import PageScaffold from "../../../components/Scaffolds/PageScaffold";
import { usePostsByTopic } from "../../../utils/supabase/db";

export default function PostsByTopic() {
  const router = useRouter();
  const { id } = router.query;
  const { error, postsByTopic } = usePostsByTopic(id as string);

  return (
    <>
      <ErrorDataLayout error={error} data={postsByTopic}>
        <PageScaffold
          title={postsByTopic?.topic}
          button={
            <RedRoundedButton
              text="View Knowledge Asset"
              onClick={() => {
                router.push(id + "/knowledge");
              }}
            />
          }
        >
          {postsByTopic?.posts.length === 0 && (
            <p className="text-2xl">
              There are currently no posts for this topic
            </p>
          )}
          <div className="flex flex-col space-y-6">
            {postsByTopic?.posts?.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </PageScaffold>
      </ErrorDataLayout>
    </>
  );
}
