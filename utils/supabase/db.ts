import {
  PostgrestResponse,
  SupabaseRealtimePayload,
} from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import JointLesson from "../../models/JointLesson";
import LinkedJointLesson from "../../models/LinkedJointLesson";
import LinkedPost from "../../models/LinkedPost";
import Post from "../../models/Post";
import PostsByTopic from "../../models/PostsByTopic";
import Topic, { anyTopic } from "../../models/Topic";
import UserInfo from "../../models/UserInfo";
import UserInfoWithPosts from "../../models/UserInfoWithPosts";
import { SearchData } from "../../pages/search";
import { anySaltStage } from "../salt";
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
          .select(
            `
            *,
            author:user_id (id, full_name, avatar_url),
            prev_salt_post:previous_salt_post_id (id, title),
            next_salt_post:next_salt_post_id (id, title)
            `
          )
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
            author:user_id (id, full_name, avatar_url),
            prev_salt_post:previous_salt_post_id (id, title),
            next_salt_post:next_salt_post_id (id, title)
            `
          )
          .eq("topic_id", topicId);

        if (postsError) {
          setError(postsError?.message);
          return;
        }

        setPostsByTopic(
          {
            topic: (topicData as Topic).title,
            posts: postsData as LinkedPost[],
          } ?? undefined
        );
      }
    }

    getPostsByTopic();
  }, [topicId, setError, setPostsByTopic]);

  return { error, postsByTopic };
};

export const usePost = (postId?: string | string[]) => {
  const [error, setError] = useState<string | undefined>(undefined);
  const [post, setPost] = useState<LinkedPost | undefined>(undefined);

  useEffect(() => {
    async function getPost() {
      const { error: e, data } = await supabase
        .from("posts")
        .select(
          `
          *,
          author:user_id (id, full_name, avatar_url),
          prev_salt_post:previous_salt_post_id (id, title),
          next_salt_post:next_salt_post_id (id, title)
          `
        )
        .eq("id", postId)
        .single();
      setError(e?.message);
      setPost(data ?? undefined);
    }

    getPost();
  }, [postId, setError, setPost]);

  return { error, post };
};

export const usePreviousLinkPosts = (saltStage: number, userId?: string) => {
  const [error, setError] = useState<string | undefined>(undefined);
  const [posts, setPosts] = useState<LinkedPost[] | undefined>(undefined);

  useEffect(() => {
    async function getPosts() {
      if (userId != undefined) {
        const { error: e, data } = await supabase
          .from("posts")
          .select(
            `
            *,
            author:user_id (full_name),
            prev_salt_post:previous_salt_post_id (id, title)
            `
          )
          .eq("user_id", userId)
          .lt("salt_stage", saltStage)
          .is("next_salt_post_id", null);
        setError(e?.message);
        setPosts(data ?? undefined);
      }
    }

    getPosts();
  }, [saltStage, setError, setPosts, userId]);

  return { error, posts };
};

export const createPost = async (post: Post) => {
  const { error: postError, data } = await supabase.from("posts").insert(post);
  if (postError) {
    return { error: postError.message };
  }
  const newPost = (data as Post[])[0];

  if (post.previous_salt_post_id) {
    const { error: linkError } = await supabase
      .from("posts")
      .update({ next_salt_post_id: newPost.id })
      .eq("id", post.previous_salt_post_id);

    // TODO: Maybe add ability to retry here
    if (linkError) {
      return {
        error:
          "Error linking previous SALT post. Please try editing the post and adding the link again.",
      };
    }
  }

  return { post_id: newPost.id };
};

export const updatePost = async (post: Post) => {
  const { error: postError, data } = await supabase.from("posts").update(post).eq("id", post.id);
  if (postError) {
    return { error: postError.message };
  }
  const newPost = (data as Post[])[0];
  // TODO: Fix SALT links when updating
  return { post_id: newPost.id };
};

type CountryPostCount = { location: string; post_count: number };
interface CountryPostCountData {
  countryPostCounts: Map<string, number>;
  maxPostCount: number;
  minPostCount: number;
}
export const useCountryPostCounts = () => {
  const [error, setError] = useState<string | undefined>(undefined);
  const [countryPostCountData, setCountryPostCountData] = useState<
    CountryPostCountData | undefined
  >(undefined);

  useEffect(() => {
    async function getCountryPostCountData() {
      const {
        error: e,
        data,
      }: PostgrestResponse<{ location: string; post_count: number }> =
        await supabase.rpc("get_country_post_counts");

      if (e) {
        setError(e?.message);
        return;
      }

      if (data == null) {
        return { countryPostCounts: new Map() };
      }

      const countryPostCounts = new Map(
        (data as CountryPostCount[]).map((item) => [
          item.location,
          item.post_count,
        ])
      );

      setCountryPostCountData({
        countryPostCounts,
        maxPostCount: data.length > 0 ? data[0].post_count : 0,
        minPostCount: data.length > 0 ? data[data.length - 1].post_count : 0,
      });
    }
    getCountryPostCountData();
  }, [setError, setCountryPostCountData]);

  return { error, countryPostCountData };
};

export const useJointLessons = (topicId: string) => {
  const [error, setError] = useState<string | undefined>(undefined);
  const [jointLessons, setJointLessons] = useState<
    LinkedJointLesson[] | undefined
  >(undefined);

  useEffect(() => {
    async function getJointLessons() {
      const { error: e, data } = await supabase.rpc<LinkedJointLesson>(
        "get_joint_lessons",
        { topic_id: topicId }
      );

      if (e) {
        setError(e?.message);
        return;
      }

      setJointLessons(data as LinkedJointLesson[]);
    }

    getJointLessons();
  }, [setError, setJointLessons, topicId]);

  return { error, jointLessons };
};

export const useFeaturedPosts = (numberOfPosts: number) => {
  const [error, setError] = useState<string | undefined>(undefined);
  const [featuredPosts, setFeaturedPosts] = useState<LinkedPost[] | undefined>(
    undefined
  );

  useEffect(() => {
    async function getFeaturedPosts() {
      const { error: e, data } = await supabase
        .from("posts")
        .select(
          `
          *,
          author:user_id (id, full_name, avatar_url),
          prev_salt_post:previous_salt_post_id (id, title),
          next_salt_post:next_salt_post_id (id, title)
          `
        )
        .order("created_at", { ascending: false })
        .limit(numberOfPosts);

      if (error) {
        setError(e?.message);
        return;
      }

      setFeaturedPosts(data as LinkedPost[]);
    }

    getFeaturedPosts();
  }, [setError, setFeaturedPosts, numberOfPosts, error]);

  return { error, featuredPosts };
};

// TODO: Maybe use rpc to search content, title and description columns
export const getSearchResults = async (searchData: SearchData) => {
  let baseQuery = supabase.from("posts").select(
    `
    *,
    author:user_id (id, full_name, avatar_url, location)
    `
  );

  if (searchData.text) {
    baseQuery = baseQuery.textSearch("content", searchData.text);
  }

  if (searchData.dateFrom) {
    baseQuery = baseQuery.gt("created_at", searchData.dateFrom);
  }

  if (searchData.dateTo) {
    baseQuery = baseQuery.lt("created_at", searchData.dateTo);
  }

  if (searchData.tags.length > 0) {
    baseQuery = baseQuery.overlaps("tags", searchData.tags);
  }

  if (searchData.topic && searchData.topic !== anyTopic) {
    baseQuery = baseQuery.eq("topic_id", searchData.topic.id);
  }

  if (searchData.saltStage && searchData.saltStage !== anySaltStage) {
    baseQuery = baseQuery.eq("salt_stage", searchData.saltStage.id);
  }

  const { error, data } = await baseQuery;
  return { error, data: data as LinkedPost[] };
};

export const addPostToExistingJointLesson = async (
  post: LinkedPost,
  jointLesson: LinkedJointLesson
) => {
  return await supabase.from("lesson_post").insert({
    lesson_id: jointLesson.lesson_id,
    post_id: post.id,
  });
};

export const addPostToNewJointLesson = async (
  post: LinkedPost,
  jointLesson: string,
  topicId: string
) => {
  const { error, data: newJointLesson } = await supabase
    .from<JointLesson>("joint_lesson")
    .insert({
      title: jointLesson,
      topic_id: topicId,
    })
    .single();

  if (error || newJointLesson == null) {
    return { error };
  }

  return await supabase.from("lesson_post").insert({
    lesson_id: newJointLesson.id,
    post_id: post.id,
  });
};

// Handle errors in this function
export const deletePost = async (post: LinkedPost) => {
  await supabase.from("lesson_post").delete().match({ post_id: post.id });

  if (!post.next_salt_post_id && post.previous_salt_post_id) {
    await supabase
      .from("posts")
      .update({ next_salt_post_id: null })
      .match({ id: post.previous_salt_post_id });
  }

  if (post.next_salt_post_id && post.previous_salt_post_id) {
    await supabase
      .from("posts")
      .update({ next_salt_post_id: post.next_salt_post })
      .match({ id: post.previous_salt_post_id });

    await supabase
      .from("posts")
      .update({ previous_salt_post_id: post.previous_salt_post_id })
      .match({ id: post.next_salt_post_id });
  }

  return await supabase.from("posts").delete().match({ id: post.id });
};
