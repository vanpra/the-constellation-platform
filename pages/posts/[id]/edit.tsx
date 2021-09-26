import classNames from "classnames";
import { useRouter } from "next/dist/client/router";
import React, { useContext, useEffect, useState } from "react";
import { RedRoundedButton } from "../../../components/Buttons";
import ModifyPost from "../../../components/Post/ModifyPost";
import PageScaffold from "../../../components/Scaffolds/PageScaffold";
import { InternalPost } from "../../../models/Post";
import { saltStages } from "../../../utils/salt";
import { updatePost, usePost, useTopics } from "../../../utils/supabase/db";
import EditIcon from "../../../assets/edit.svg";
import { UserContext } from "../../_app";
import ErrorDataLayout from "../../../components/Scaffolds/ErrorDataScaffold";

export default function EditPostPage() {
  // TODO: handle topics error
  const { topics } = useTopics();
  const router = useRouter();
  const { id } = router.query;
  const { error: postError, post } = usePost(id);
  const user = useContext(UserContext);
  const [error, setError] = useState("");

  const [postData, setPostData] = useState<InternalPost>({
    title: "",
    description: "",
    content: "",
    topic: undefined,
    saltStage: saltStages[0],
    previousPost: undefined,
    tags: [],
    knowledgeAssets: [],
  });

  useEffect(() => {
    if (post) {
      setPostData({
        title: post.title,
        description: post.description,
        content: post.content,
        topic: topics?.find((topic) => topic.id === post.topic_id),
        saltStage: saltStages[post.salt_stage ?? 0],
        previousPost: post.prev_salt_post,
        tags: post.tags ?? [],
        knowledgeAssets: post.knowledge_asset ?? [],
      });
    }
  }, [post, topics]);

  const onUpdate = async () => {
    if (!user) {
      setError(
        "You must be logged in to publish a post. Please try again later."
      );
      return;
    }

    if (!postData.topic) {
      setError(
        "The given topic is invalid. Please try changing it and publishing again."
      );
      return;
    }

    const { post_id, error } = await updatePost({
      user_id: user.id,
      title: postData.title,
      description: postData.description,
      content: postData.content,
      topic_id: postData.topic.id,
      salt_stage: postData.saltStage.id,
      tags: postData.tags,
      previous_salt_post_id: postData.previousPost?.id,
      knowledge_asset: postData.knowledgeAssets.filter((asset) => asset !== ""),
    });

    if (error) {
      setError(error);
    } else {
      router.push(`/posts/${post_id}`);
    }
  };

  return (
    <PageScaffold
      className="mb-12"
      icon={<EditIcon width="50" height="50" />}
      title="Currently Editing..."
    >
      <ErrorDataLayout error={postError} data={post}>
        <ModifyPost
          post={postData}
          setPost={setPostData}
          topics={topics ?? []}
          saveBtn={
            <>
              <RedRoundedButton
                className="mt-4 py-3"
                text="Update post"
                icon={
                  <EditIcon
                    height="24"
                    width="24"
                    className={classNames("fill-current text-white")}
                  />
                }
                onClick={onUpdate}
              />
              {error && (
                <p className="text-xl text-red-700 mt-4 mb-4">{error}</p>
              )}
            </>
          }
        />
      </ErrorDataLayout>
    </PageScaffold>
  );
}
