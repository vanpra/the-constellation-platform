import { useEffect, useState } from "react";
import Post from "../models/Post";
import PostsByTopic from "../models/PostsByTopic";
import Topic from "../models/Topic";
import { supabase } from "./supabaseClient";

export const useTopics = () => {
  const [error, setError] = useState<string | undefined>(undefined);
  const [topics, setTopics] = useState<Topic[] | undefined>(undefined);

  useEffect(() => {
    async function getTopics() {
      const { error: e, data } = await supabase.from("topics").select();
      setError(e?.message);
      setTopics(data ?? undefined);
    }

    getTopics();
  }, [setError, setTopics]);

  return { error, topics };
};

export const useTopic = (topicId: number) => {
  const [error, setError] = useState<string | undefined>(undefined);
  const [topic, setTopic] = useState<Topic | undefined>(undefined);

  useEffect(() => {
    async function getTopic() {
      const { error: e, data } = await supabase
        .from("topics")
        .select()
        .eq("id", topicId)
        .single();
      setError(e?.message);
      setTopic(data ?? undefined);
    }

    getTopic();
  }, [topicId, setError, setTopic]);

  return { error, topic };
};

// TODO: Find a way to not include string[] in type
export const usePostsByTopic = (topicId?: string | string[]) => {
  const [error, setError] = useState<string | undefined>(undefined);
  const [postsByTopic, setPostsByTopic] = useState<PostsByTopic | undefined>(
    undefined
  );

  useEffect(() => {
    async function getPostsByTopic() {
      if (topicId != undefined) {
        const { error: topicError, data: topicData } = await supabase
          .from("topics")
          .select()
          .eq("id", topicId)
          .single();

        if (topicError) {
          setError(topicError?.message);
          return;
        }

        const { error: postsError, data: postsData } = await supabase
          .from("posts")
          .select()
          .eq("topic_id", topicId);

        setError(postsError?.message);
        setPostsByTopic(
          { topic: (topicData as Topic).title, posts: postsData as Post[] } ??
            undefined
        );
      }
    }

    getPostsByTopic();
  }, [topicId, setError, setPostsByTopic]);

  return { error, postsByTopic };
};
