import { AccountRole } from "common/types/auth";
import { getInitialsFromName } from "common/utils/common";
import useAuth from "hooks/useAuth";
import { useState } from "react";
import { ProfileDropDown } from "./ProfileDropDown";

interface UserProfileIconProps {
  type: "image" | "text";
  name: string;
  url?: string;
}

export const UserProfileIcon = ({
  name,
  type,
  url,
}: UserProfileIconProps): JSX.Element => {
  const [isShowDropDown, setShowDropDown] = useState(false);
  const { currentUserProfile } = useAuth();
  const handleProfileClicked = () => {
    setShowDropDown((prev) => !prev);
  };
  console.log("url", url);
  return (
    <div
      className="relative flex items-center gap-2 "
      onClick={handleProfileClicked}
    >
      {type === "image" && url ? (
        <div className="h-10 w-10 rounded-full border overflow-hidden cursor-pointer">
          <img
            src={`${url}`}
            className="w-full h-full object-cover"
            alt="avatar"
          />
        </div>
      ) : (
        <div className="h-10 w-10 rounded-full flex items-center justify-center bg-light-red text-white font-medium cursor-pointer">
          <span>{getInitialsFromName(name)}</span>
        </div>
      )}
      <div>
        <span className="font-medium">{name}</span>
      </div>
      {isShowDropDown && (
        <ProfileDropDown
          isAdmin={currentUserProfile?.role_name === AccountRole.ADMIN}
        />
      )}
    </div>
  );
};
