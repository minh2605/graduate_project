import { getInitialsFromName } from "common/utils/common";

interface UserProfileIconProps {
  type: "image" | "text";
  name: string;
  url?: string;
}
export const UserProfileIcon = ({
  name,
  type,
}: UserProfileIconProps): JSX.Element => {
  return (
    <div className="flex items-center gap-2">
      {type === "image" ? (
        <div className="h-10 w-10 rounded-full border overflow-hidden cursor-pointer">
          <img
            src="https://yt3.ggpht.com/ytc/AKedOLTrmdNREVF1e2SnENZtbqy_lq93rJWP9HrJcOuoCw=s88-c-k-c0x00ffffff-no-rj-mo"
            alt="profile-avatar"
            className="w-full h-full object-cover"
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
    </div>
  );
};
