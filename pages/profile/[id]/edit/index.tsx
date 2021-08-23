import { useRouter } from "next/dist/client/router";
import React, { useMemo, useState } from "react";
import ReactCountryFlag from "react-country-flag";
import Avatar from "../../../../components/Avatar/Avatar";
import { RedRoundedButton } from "../../../../components/Buttons";
import CountryDropdown from "../../../../components/Dropdown/CountryDropdown";
import TextInput from "../../../../components/Inputs";
import ErrorDataScaffold from "../../../../components/Scaffolds/ErrorDataScaffold";
import PageScaffold from "../../../../components/Scaffolds/PageScaffold";
import { Country, findCountryByCode } from "../../../../utils/countries";
import {
  getAvatarUrl,
  moveTempAvatar,
  updateUserInfo,
  useUserInfo,
} from "../../../../utils/supabase";
import SaveIcon from "../../../../assets/save.svg";
import EditIcon from "../../../../assets/edit.svg";
import ImageUploadDialog from "../../../../components/Dialogs/ImageUploadDialog";

//TODO: Split this up and extract common header
//TODO: Handle non null assertions
export default function EditProfilePage() {
  const router = useRouter();
  const { id } = router.query;
  const { userInfo, setUserInfo, error } = useUserInfo(id as string);
  const selectedCountry = useMemo(
    () => findCountryByCode(userInfo?.location),
    [userInfo]
  );
  const [isUploading, setIsUploading] = useState(false);
  const [avatarChanged, setAvatarChanged] = useState(false);

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
              onClick={() => setIsUploading(true)}
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
                  // Check that url is a supabase one
                  if (avatarChanged) {
                    moveTempAvatar(userInfo?.id);
                    setUserInfo({
                      ...userInfo!,
                      //TODO: Handle errors here
                      avatar_url: getAvatarUrl(userInfo!.id, "public")
                        .publicURL!,
                    });
                  }

                  const { error } = await updateUserInfo(userInfo);
                  if (!error) {
                    router.push(`/profile/${userInfo.id}`);
                  } else {
                    //TODO: Display error
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
        <ImageUploadDialog
          isOpen={isUploading}
          setIsOpen={setIsUploading}
          userId={userInfo?.id}
          onUpload={(url: string, isUpload: boolean) => {
            setUserInfo({
              ...userInfo!,
              //TODO: Handle errors here
              avatar_url: url,
            });
            setAvatarChanged(isUpload);
          }}
        />
      </ErrorDataScaffold>
    </PageScaffold>
  );
}
