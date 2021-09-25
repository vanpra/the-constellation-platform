import { useRouter } from "next/dist/client/router";
import React from "react";
import PostCard from "../../../components/Cards/PostCard";
import PostKnowledgeCard from "../../../components/Cards/PostKnowledgeCard";
import ErrorDataLayout from "../../../components/Scaffolds/ErrorDataScaffold";
import PageScaffold from "../../../components/Scaffolds/PageScaffold";
import { usePostsByTopic } from "../../../utils/supabase/db";

export default function KnowledgeAssetPage() {
  const router = useRouter();
  const { id } = router.query;
  const { error, postsByTopic } = usePostsByTopic(id as string);
  const postsWithKnowledge =
    postsByTopic?.posts?.filter(
      (post) => post.knowledge_asset && post.knowledge_asset.length > 0
    ) || [];
  return (
    <>
      <ErrorDataLayout error={error} data={postsWithKnowledge}>
        <PageScaffold title={postsByTopic?.topic + " - Knowledge Asset"}>
          {postsWithKnowledge.length === 0 ? (
            <p className="text-2xl">
              There are currently no posts for this topic
            </p>
          ) : (
            <div className="flex flex-col space-y-6">
              {postsWithKnowledge.map((post, index) => (
                <PostKnowledgeCard key={index} post={post} />
              ))}
            </div>
          )}
        </PageScaffold>
      </ErrorDataLayout>
    </>
  );
}
