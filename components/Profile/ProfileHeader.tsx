import React from "react";
import ReactCountryFlag from "react-country-flag";
import UserInfo from "../../models/UserInfo";
import Avatar from "../Avatar/Avatar";

interface ProfileHeaderProps {
  userInfo?: UserInfo;
  onAvatarClick?: () => void;
  button?: React.ReactNode;
}

export function ProfileHeader(props: ProfileHeaderProps) {
  const { userInfo, onAvatarClick, button } = props;

  return (
    <div className="flex items-center justify-between flex-row">
      <div className="flex flex-row items-center">
        <Avatar
          className="h-32 w-32"
          avatarUrl={userInfo?.avatar_url}
          name={userInfo?.full_name}
          onClick={onAvatarClick}
        />
        <div className="flex flex-col ml-12">
          <div className="flex items-center text-4xl">
            <h1 className="font-bold">{userInfo?.full_name} </h1>
            {userInfo?.location && (
              <ReactCountryFlag
                className="ml-4"
                countryCode={userInfo.location}
              />
            )}
          </div>
          <p className="mt-1 text-xl">{userInfo?.description}</p>
        </div>
      </div>

      <div>{button}</div>
    </div>
  );
}
