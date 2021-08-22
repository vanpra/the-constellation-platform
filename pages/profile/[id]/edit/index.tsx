import { useRouter } from "next/dist/client/router";
import React, { useContext, useMemo } from "react";
import ReactCountryFlag from "react-country-flag";
import Avatar from "../../../../components/Avatar/Avatar";
import { RedRoundedButton } from "../../../../components/Buttons";
import CountryDropdown from "../../../../components/Dropdown/CountryDropdown";
import TextInput from "../../../../components/Inputs";
import ErrorDataScaffold from "../../../../components/Scaffolds/ErrorDataScaffold";
import PageScaffold from "../../../../components/Scaffolds/PageScaffold";
import { Country, findCountryByCode } from "../../../../utils/countries";
import { updateUserInfo, useUserInfo } from "../../../../utils/db";
import SaveIcon from "../../../../assets/save.svg";
import EditIcon from "../../../../assets/edit.svg";
import { UserContext } from "../../../_app";

export default function EditProfilePage() {
  const router = useRouter();
  const { id } = router.query;
  const { userInfo, setUserInfo, error } = useUserInfo(id as string);
  const selectedCountry = useMemo(
    () => findCountryByCode(userInfo?.location),
    [userInfo]
  );

  return (
    <PageScaffold
      icon={<EditIcon width="50" height="50" />}
      title="Edit Profile"
    >
      <ErrorDataScaffold error={error} data={userInfo}>
        <div className="flex items-center justify-between flex-row">
          <div className="flex flex-row items-center">
            <Avatar
              className="h-32 w-32"
              avatarUrl={userInfo?.avatar_url}
              name={userInfo?.full_name}
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
              <p className="text-xl"></p>
            </div>
          </div>

          <div>
            <RedRoundedButton
              text="Save"
              icon={
                <SaveIcon
                  height="24"
                  width="24"
                  className="fill-current text-white"
                />
              }
              className="ml-16"
              onClick={async () => {
                console.log(userInfo);
                if (userInfo) {
                  const { error } = await updateUserInfo(userInfo);
                  if (!error) {
                    router.push(`/profile/${userInfo.id}`);
                  } else {
                    console.log(error.message);
                  }
                }
              }}
            />
          </div>
        </div>
        <div className="flex gap-x-5 w-full mt-8">
          <TextInput
            value={userInfo?.full_name ?? ""}
            setValue={(value) =>
              setUserInfo({ ...userInfo!, full_name: value })
            }
            label="Full Name"
            className="flex-1"
          />
          <CountryDropdown
            className="flex-1"
            selected={selectedCountry}
            onChange={(value: Country) =>
              setUserInfo({ ...userInfo!, location: value.code })
            }
          />
        </div>

        <TextInput
          className="flex-1 pt-4"
          value={userInfo?.description ?? ""}
          setValue={(value) =>
            setUserInfo({ ...userInfo!, description: value })
          }
          label="Description (Max 100 characters)"
          maxLength={100}
        />
      </ErrorDataScaffold>
    </PageScaffold>
  );
}
