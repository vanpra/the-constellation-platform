import { SupabaseRealtimePayload } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import Post from "../../models/Post";
import PostsByTopic from "../../models/PostsByTopic";
import Topic from "../../models/Topic";
import UserInfo from "../../models/UserInfo";
import UserInfoWithPosts from "../../models/UserInfoWithPosts";
import { supabase } from "./supabaseClient";

export const useUserInfo = (userId?: string) => {
  const [error, setError] = useState<string | undefined>(undefined);
  const [userInfo, setUserInfo] = useState<UserInfo | undefined>(undefined);

  useEffect(() => {
    async function getUser() {
      if (userId != undefined) {
        const { error: e, data } = await supabase
          .from("users")
          .select()
          .eq("id", userId)
          .single();

        if (!e) {
          supabase
            .from(`users:id=eq.${userId}`)
            .on("UPDATE", (payload: SupabaseRealtimePayload<UserInfo>) => {
              console.log(payload.new);
              setUserInfo(payload.new);
            })
            .subscribe();
        }

        setError(e?.message);
        setUserInfo(data ?? undefined);
      } else {
        setError(undefined);
        setUserInfo(undefined);
      }
    }

    getUser();
  }, [setError, setUserInfo, userId]);

  return { error, userInfo, setUserInfo };
};

export const updateUserInfo = async (userInfo: UserInfo) =>
  await supabase.from("users").update(userInfo).match({ id: userInfo.id });

export const useUserInfoWithPosts = (userId?: string) => {
  const [error, setError] = useState<string | undefined>(undefined);
  const [userInfoWithPosts, setUserInfoWithPosts] = useState<
    UserInfoWithPosts | undefined
  >(undefined);

  useEffect(() => {
    async function getUserInfoWithPosts() {
      if (userId != undefined) {
        const { error: userError, data: userData } = await supabase
          .from("users")
          .select()
          .eq("id", userId)
          .single();

        if (userError) {
          setError(userError?.message);
          return;
        }

        const { error: postsError, data: postsData } = await supabase
          .from("posts")
          .select()
          .eq("user_id", userId);

        if (postsError) {
          setError(postsError?.message);
          return;
        }
        setUserInfoWithPosts({
          ...userData,
          posts: postsData,
        });
      }
    }

    getUserInfoWithPosts();
  }, [userId, setError, setUserInfoWithPosts]);

  return { error, userInfoWithPosts };
};

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

export const usePostsByTopic = (topicId?: string) => {
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
          .select(
            `
          *,
          author:user_id (full_name, avatar_url),
          prev_salt_post:previous_salt_post_id (id, title)
        `
          )
          .eq("topic_id", topicId);

        if (postsError) {
          setError(postsError?.message);
          return;
        }

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

export const usePost = (postId?: string | string[]) => {
  const [error, setError] = useState<string | undefined>(undefined);
  const [post, setPost] = useState<Post | undefined>(undefined);

  useEffect(() => {
    async function getPost() {
      // SELECT posts.*, users as author
      // FROM posts
      // INNER JOIN users ON posts.user_id=users.id
      // WHERE posts.id = 1;
      const { error: e, data } = await supabase
        .from("posts")
        .select(
          `
        *,
        author:user_id (full_name, avatar_url),
        prev_salt_post:previous_salt_post_id (id, title)
      `
        )
        .eq("id", postId)
        .single();
      setError(e?.message);
      setPost(data ?? undefined);
      console.log(data);
    }

    getPost();
  }, [postId, setError, setPost]);

  return { error, post };
};
