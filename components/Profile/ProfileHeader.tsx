import React from "react";
import ReactCountryFlag from "react-country-flag";
import UserInfo from "../../models/UserInfo";
import { findCountryByCode } from "../../utils/countries";
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
          className="w-16 md:w-32 lg:w-48 h-16 md:h-32 lg:h-48 flex-grow-0 flex-shrink-0"
          avatarUrl={userInfo?.avatar_url}
          name={userInfo?.full_name}
          onClick={onAvatarClick}
        />
        <div className="flex flex-col ml-12">
          <div className="flex items-center text-4xl">
            <h1 className="font-bold">{userInfo?.full_name} </h1>
            {userInfo?.location && (
              <div className="has-tooltip">
                <span className="tooltip rounded shadow-lg p-1 text-base bg-gray-200 text-black -mt-6">
                  {findCountryByCode(userInfo.location).name}
                </span>
                {userInfo.location != undefined &&
                userInfo.location != "NAN" ? (
                  <ReactCountryFlag
                    className="ml-4"
                    countryCode={userInfo.location}
                  />
                ) : (
                  <></>
                )}
              </div>
            )}
          </div>
          <p className="mt-1 break-all text-xl">{userInfo?.description}</p>
        </div>
      </div>
      <div className="w-20"></div>
      <div className="flex-grow-0 flex-shrink-0">{button}</div>
    </div>
  );
}
