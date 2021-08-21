import { useRouter } from "next/dist/client/router";
import React from "react";
import Avatar from "../../components/Avatar/Avatar";
import { RedRoundedButton } from "../../components/Buttons";
import ErrorDataScaffold from "../../components/Scaffolds/ErrorDataScaffold";
import PageScaffold from "../../components/Scaffolds/PageScaffold";
import { useUserInfo, useUserInfoWithPosts } from "../../utils/db";

export default function ProfilePage() {
  const router = useRouter();
  const { id } = router.query;
  const { userInfoWithPosts, error } = useUserInfoWithPosts(id as string);

  return (
    <PageScaffold>
      <ErrorDataScaffold error={error} data={userInfoWithPosts}>
        <div className="flex items-center justify-center flex-row pb-12">
          <Avatar
            className="h-32 w-32"
            avatarUrl={userInfoWithPosts?.avatar_url}
            name={userInfoWithPosts?.full_name}
          />
          <div className="flex flex-col ml-12">
            <h1 className="text-4xl font-bold">
              {userInfoWithPosts?.full_name}
            </h1>
            <p className="text-xl">{userInfoWithPosts?.description}</p>
          </div>

          <RedRoundedButton text="Edit" className="ml-16" />
        </div>
        {userInfoWithPosts?.posts?.map((post) => (
          <p key={post?.id}>
            Post Header (as own component) with title, views, profile pic,
            author, date posted
            {post?.title} {post?.views} view(s). Posted by{" "}
            {post?.author?.full_name}, on {post?.created_at}
          </p>
        ))}
      </ErrorDataScaffold>
    </PageScaffold>
  );
}
