import SvgMenuBar from "common/components/svg/MenuBar";
import useAuth from "hooks/useAuth";
import tw, { styled } from "twin.macro";
import { UserProfileIcon } from "./UserProfileIcon";

export const HeaderSeachBar = styled.div(
  tw`flex items-center border rounded-3xl p-2 ml-8 w-auto justify-self-center`
);

interface HeaderAdminProps {
  isToggle: boolean;
  setToggle: (value: boolean) => void;
}

export const HeaderAdmin = ({
  isToggle,
  setToggle,
}: HeaderAdminProps): JSX.Element => {
  const { currentUserProfile } = useAuth();
  return (
    <div
      className={`fixed z-fixed ${
        isToggle ? "left-0" : "left-72"
      }  top-0 right-0 px-6 h-20 flex items-center justify-between border-b transition-all bg-white`}
    >
      <SvgMenuBar
        onClick={() => setToggle(!isToggle)}
        className="cursor-pointer"
      />
      {/* <HeaderSeachBar>
        <input
          type="text"
          placeholder="Search"
          className="border-0 max-w-full focus:outline-none text-sm flex-1 lg:px-4"
        />
        <SvgSearch className="shrink-0" />
      </HeaderSeachBar> */}
      {currentUserProfile && (
        <div className="flex items-center justify-end basis-1/4">
          {/* <SvgNotification className="text-dark-red" /> */}
          <UserProfileIcon type="text" name={currentUserProfile.name} />
        </div>
      )}
    </div>
  );
};
