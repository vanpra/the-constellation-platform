import { useRouter } from "next/dist/client/router";
import React from "react";
import Avatar from "../../../components/Avatar/Avatar";
import { RedRoundedButton } from "../../../components/Buttons";
import ErrorDataScaffold from "../../../components/Scaffolds/ErrorDataScaffold";
import PageScaffold from "../../../components/Scaffolds/PageScaffold";
import { useUserInfoWithPosts } from "../../../utils/db";
import EditIcon from "../../../assets/edit.svg";
import Post from "../../../models/Post";
import ReactCountryFlag from "react-country-flag";

export default function ProfilePage() {
  const router = useRouter();
  const { id } = router.query;
  const { userInfoWithPosts, error } = useUserInfoWithPosts(id as string);

  return (
    <PageScaffold title="My Profile">
      <ErrorDataScaffold error={error} data={userInfoWithPosts}>
        <div className="pb-12 flex items-center justify-between flex-row">
          <div className="flex flex-row items-center">
            <Avatar
              className="h-32 w-32"
              avatarUrl={userInfoWithPosts?.avatar_url}
              name={userInfoWithPosts?.full_name}
            />
            <div className="flex flex-col ml-12">
              <div className="flex items-center text-4xl">
                <h1 className="font-bold">{userInfoWithPosts?.full_name} </h1>
                {userInfoWithPosts?.location && (
                  <ReactCountryFlag
                    className="ml-4"
                    countryCode={userInfoWithPosts.location}
                  />
                )}
              </div>
              <p className="mt-1 text-xl">{userInfoWithPosts?.description}</p>
              <p className="text-xl"></p>
            </div>
          </div>

          <div>
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
          </div>
        </div>
        {userInfoWithPosts?.posts?.map((post: Post) => (
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
