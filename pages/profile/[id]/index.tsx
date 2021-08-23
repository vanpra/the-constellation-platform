import { useRouter } from "next/dist/client/router";
import React from "react";
import { RedRoundedButton } from "../../../components/Buttons";
import ErrorDataLayout from "../../../components/Scaffolds/ErrorDataScaffold";
import PageScaffold from "../../../components/Scaffolds/PageScaffold";
import { useUserInfoWithPosts } from "../../../utils/supabase/db";
import EditIcon from "../../../assets/edit.svg";
import Post from "../../../models/Post";
import { ProfileHeader } from "../../../components/Profile/ProfileHeader";

export default function ProfilePage() {
  const router = useRouter();
  const { id } = router.query;
  const { userInfoWithPosts, error } = useUserInfoWithPosts(id as string);

  return (
    <PageScaffold title="My Profile">
      <ErrorDataLayout error={error} data={userInfoWithPosts}>
        <ProfileHeader
          userInfo={userInfoWithPosts}
          button={
            <RedRoundedButton
              text="Edit"
              icon={
                <EditIcon
                  height="24"
                  width="24"
                  className="fill-current text-white"
                />
              }
              onClick={() => router.push(`${router.asPath}/edit`)}
              className="ml-16"
            />
          }
        />

        {userInfoWithPosts?.posts?.map((post: Post) => (
          <p key={post?.id}>
            Post Header (as own component) with title, views, profile pic,
            author, date posted
            {post?.title} {post?.views} view(s). Posted by{" "}
            {post?.author?.full_name}, on {post?.created_at}
          </p>
        ))}
      </ErrorDataLayout>
    </PageScaffold>
  );
}
