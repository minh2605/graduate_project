import FoogleLogo from "assets/svg/foogle-logo.svg";
import { Link, useNavigate } from "react-router-dom";
import SvgSearch from "common/components/svg/Search";
import SvgCart from "common/components/svg/Cart";
import tw, { styled } from "twin.macro";
import { MenuBar } from "common/components/MenuBar";
import SvgMenuBar from "common/components/svg/MenuBar";
import { useState } from "react";
import { UserProfileIcon } from "features/Admin/components/UserProfileIcon";
import useAuth from "hooks/useAuth";
import useCart from "hooks/useCart";

const HeaderWrapper = styled.div(
  tw`fixed z-fixed inset-0 h-24 px-5 py-2 bg-white border border-border-grey flex justify-center items-center font-medium md:px-14 md:justify-between lg:px-20`
);
const HeaderSeachBar = styled.div(
  tw`flex items-center border rounded-3xl p-2 ml-8 w-auto justify-self-center`
);

export const HeaderActionButton = styled.div(
  tw`flex items-center w-32 py-2 px-4 border rounded-3xl gap-6 border-2 border-dark-red text-center cursor-pointer`
);

export const LogoText = styled.h2(
  tw`text-h2 text-dark-red font-bangers tracking-wide`
);

export const Header = (): JSX.Element => {
  const navigate = useNavigate();
  const [isMenuBarShow, setMenuBarShow] = useState(false);
  const { isLoggedIn, currentUserProfile } = useAuth();
  const cartInfo = useCart();

  const handleShowMenuBar = () => {
    setMenuBarShow((isMenubarShow) => !isMenubarShow);
  };
  const handleCartClicked = () => {
    if (cartInfo.productCart?.length === 0) {
      alert("No product in cart");
      return;
    }
    navigate("../checkout");
  };
  return (
    <HeaderWrapper>
      <div className="flex items-center h-full flex-1 basis-2/5 justify-center gap-1 md:gap-4 md:flex-initial">
        <SvgMenuBar
          onClick={handleShowMenuBar}
          className="cursor-pointer shrink-0"
        />
        <Link to="/" className="items-center h-full shrink-0 hidden md:flex">
          <img
            src={FoogleLogo}
            alt="logo"
            className="h-full flex-1 object-cover"
          />
          <LogoText className="hidden lg:block">Foogle</LogoText>
        </Link>
        <HeaderSeachBar>
          <input
            type="text"
            placeholder="Search"
            className="border-0 max-w-full focus:outline-none text-sm flex-1 lg:px-4"
          />
          <SvgSearch className="shrink-0" />
        </HeaderSeachBar>
      </div>

      <div className="hidden md:flex items-center gap-4">
        <HeaderActionButton
          className="bg-dark-red text-white"
          onClick={handleCartClicked}
        >
          <SvgCart />
          <span className="flex-1 text-center">
            {cartInfo.productCart?.length || 0}
          </span>
        </HeaderActionButton>
        {isLoggedIn && currentUserProfile ? (
          <div>
            <UserProfileIcon
              type={`${currentUserProfile.avatar ? "image" : "text"}`}
              name={currentUserProfile.name}
              url={currentUserProfile.avatar}
            />
          </div>
        ) : (
          <HeaderActionButton>
            <Link to="/public/sign-in" className="block w-full">
              <span className="w-full">Sign in</span>
            </Link>
          </HeaderActionButton>
        )}
      </div>

      <MenuBar isMenuBarShow={isMenuBarShow} onClose={handleShowMenuBar} />
    </HeaderWrapper>
  );
};
