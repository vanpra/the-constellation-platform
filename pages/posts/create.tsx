import classNames from "classnames";
import { useRouter } from "next/dist/client/router";
import React, { useContext, useState } from "react";
import EditIcon from "../../assets/edit.svg";
import Upload from "../../assets/upload.svg";
import { RedRoundedButton } from "../../components/Buttons";
import ModifyPost from "../../components/Post/ModifyPost";
import PageScaffold from "../../components/Scaffolds/PageScaffold";
import { InternalPost } from "../../models/Post";
import Topic from "../../models/Topic";
import { saltStages } from "../../utils/salt";
import { createPost } from "../../utils/supabase/db";
import { supabase } from "../../utils/supabase/supabaseClient";
import { UserContext } from "../_app";

interface CreatePostPageProps {
  topics: Topic[];
}

export async function getStaticProps() {
  const { error, data } = await supabase.from("topics").select();

  if (error) {
    return {
      notFound: true,
      revalidate: 86400,
    };
  }

  return {
    props: {
      topics: data,
      revalidate: 86400,
    },
  };
}

export default function CreatePostPage(props: CreatePostPageProps) {
  const { topics } = props;
  const [post, setPost] = useState<InternalPost>({
    title: "",
    description: "",
    content: "",
    topic: topics[0],
    saltStage: saltStages[0],
    previousPost: undefined,
    tags: [],
    knowledgeAssets: [],
  });
  const router = useRouter();
  const user = useContext(UserContext);
  const [error, setError] = useState("");

  const onPublish = async () => {
    if (!user) {
      setError(
        "You must be logged in to publish a post. Please try again later."
      );
      return;
    }
    if (!post.topic) {
      setError(
        "The given topic is invalid. Please try changing it and publishing again."
      );
      return;
    }

    const { post_id, error } = await createPost({
      user_id: user.id,
      title: post.title,
      description: post.description,
      content: post.content,
      topic_id: post.topic.id,
      salt_stage: post.saltStage.id,
      tags: post.tags,
      previous_salt_post_id: post.previousPost?.id,
      knowledge_asset: post.knowledgeAssets.filter((asset) => asset !== ""),
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
      <ModifyPost
        post={post}
        setPost={setPost}
        topics={topics}
        saveBtn={
          <>
            <RedRoundedButton
              className="mt-6 py-3"
              text="Publish"
              icon={
                <Upload
                  height="24"
                  width="24"
                  className={classNames("fill-current text-white")}
                />
              }
              onClick={onPublish}
            />
            {error && <p className="text-xl text-red-700 mt-4 mb-4">{error}</p>}
          </>
        }
      />
    </PageScaffold>
  );
}
