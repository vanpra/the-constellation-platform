import { useRouter } from "next/dist/client/router";
import React, { useMemo, useState } from "react";
import { TransparentRoundedButton } from "../../../components/Buttons";
import PostKnowledgeCard from "../../../components/Cards/PostKnowledgeCard";
import JointLessonDialog from "../../../components/Dialogs/JoinLessonDialog";
import ErrorDataLayout from "../../../components/Scaffolds/ErrorDataScaffold";
import PageScaffold from "../../../components/Scaffolds/PageScaffold";
import LinkedPost from "../../../models/LinkedPost";
import {
  addPostToExistingJointLesson,
  addPostToNewJointLesson,
  usePostsByTopic,
} from "../../../utils/supabase/db";

export default function KnowledgeAssetPage() {
  const router = useRouter();
  const { id } = router.query;
  const { error, postsByTopic } = usePostsByTopic(id as string);
  const [joinLessonDialogOpen, setJoinLessonDialogOpen] = useState(false);
  const postsWithKnowledge = useMemo(
    () =>
      postsByTopic?.posts?.filter(
        (post) => post.knowledge_asset && post.knowledge_asset.length > 0
      ) || [],
    [postsByTopic?.posts]
  );
  const [selectedPost, setSelectedPost] = useState<LinkedPost | undefined>(
    undefined
  );

  return (
    <>
      <ErrorDataLayout error={error} data={postsWithKnowledge}>
        <PageScaffold title={postsByTopic?.topic + " - Knowledge Asset"}>
          {postsWithKnowledge.length === 0 ? (
            <p className="text-2xl">
              There are no contributions to this knowledge asset! <br />
              Create a post to share your experience and be the first!
            </p>
          ) : (
            <>
              <TransparentRoundedButton
                className="text-primary font-semibold mr-auto pb-4"
                text="View Joint Lessons"
                onClick={() => {
                  router.push(`/topics/${id}/lessons`);
                }}
              />
              <div className="flex flex-col space-y-6">
                {postsWithKnowledge.map((post, index) => (
                  <PostKnowledgeCard
                    key={index}
                    post={post}
                    onAddJointLesson={() => {
                      setSelectedPost(post);
                      setJoinLessonDialogOpen(true);
                    }}
                  />
                ))}
              </div>
            </>
          )}
        </PageScaffold>

        <JointLessonDialog
          topicId={id as string}
          onJointLessonClick={async (jointLesson) => {
            if (selectedPost) {
              await addPostToExistingJointLesson(selectedPost, jointLesson);
            }
          }}
          onNewJointLesson={async (jointLesson) => {
            if (selectedPost) {
              await addPostToNewJointLesson(
                selectedPost,
                jointLesson,
                id as string
              );
            }
          }}
          isOpen={joinLessonDialogOpen}
          setIsOpen={setJoinLessonDialogOpen}
        />
      </ErrorDataLayout>
    </>
  );
}
