import { useRouter } from "next/dist/client/router";
import React from "react";
import Avatar from "../../components/Avatar/Avatar";
import PageScaffold from "../../components/Scaffolds/PageScaffold";
import { useUserInfo } from "../../utils/db";

export default function ProfilePage() {
  const router = useRouter();
  const { id } = router.query;
  const { userInfo } = useUserInfo(id as string);

  return (
    <PageScaffold>
      <div className="flex items-center justify-center flex-row">
        <Avatar
          className="h-32 w-32"
          avatarUrl={userInfo?.avatar_url}
          name={userInfo?.full_name}
        />
        <div className="flex flex-col ml-12">
          <h1 className="text-4xl font-bold">{userInfo?.full_name}</h1>
          <p className="text-xl">{userInfo?.description}</p>
        </div>
      </div>
    </PageScaffold>
  );
}
