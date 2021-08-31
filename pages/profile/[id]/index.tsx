import { useRouter } from "next/dist/client/router";
import React from "react";
import { RedRoundedButton } from "../../../components/Buttons";
import ErrorDataLayout from "../../../components/Scaffolds/ErrorDataScaffold";
import PageScaffold from "../../../components/Scaffolds/PageScaffold";
import { useUserInfoWithPosts } from "../../../utils/supabase/db";
import EditIcon from "../../../assets/edit.svg";
import Post from "../../../models/Post";
import { ProfileHeader } from "../../../components/Profile/ProfileHeader";
import PostCard from "../../../components/Cards/PostCard";

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

        <p className="text-2xl font-bold mt-8 mb-4 ml-2">
          {userInfoWithPosts?.full_name}&apos;s Contributions to The
          Constellation
        </p>

        {userInfoWithPosts?.posts?.map((post: Post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </ErrorDataLayout>
    </PageScaffold>
  );
}
