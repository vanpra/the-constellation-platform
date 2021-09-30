import { useRouter } from "next/dist/client/router";
import React, { useContext } from "react";
import { RedRoundedButton } from "../../../components/Buttons";
import ErrorDataLayout from "../../../components/Scaffolds/ErrorDataScaffold";
import PageScaffold from "../../../components/Scaffolds/PageScaffold";
import { useUserInfoWithPosts } from "../../../utils/supabase/db";
import EditIcon from "../../../assets/edit.svg";
import { ProfileHeader } from "../../../components/Profile/ProfileHeader";
import PostCard from "../../../components/Cards/PostCard";
import LinkedPost from "../../../models/LinkedPost";
import { UserContext } from "../../_app";

export default function ProfilePage() {
  const router = useRouter();
  const { id } = router.query;
  const { userInfoWithPosts, error } = useUserInfoWithPosts(id as string);
  const user = useContext(UserContext);

  return (
    <PageScaffold title="Profile">
      <ErrorDataLayout error={error} data={userInfoWithPosts}>
        <ProfileHeader
          userInfo={userInfoWithPosts}
          button={
            user?.id === id ? (
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
            ) : (
              <></>
            )
          }
        />

        <p className="text-2xl font-bold mt-8 mb-4 ml-2">
          {userInfoWithPosts?.full_name}&apos;s Contributions to The
          Constellation
        </p>
        <div className="flex flex-col space-y-6">
          {userInfoWithPosts?.posts?.map((post: LinkedPost) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </ErrorDataLayout>
    </PageScaffold>
  );
}
