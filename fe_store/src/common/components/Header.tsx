import FoogleLogo from "assets/svg/foogle-logo.svg";
import { Link } from "react-router-dom";
import SvgSearch from "common/components/svg/Search";
import SvgCart from "common/components/svg/Cart";
import tw, { styled } from "twin.macro";

const HeaderSeachBar = styled.div(
  tw`flex items-center border rounded-3xl p-2 ml-8 w-auto`
);

const HeaderActionButton = styled.div(
  tw`flex items-center w-32 py-2 px-4 border rounded-3xl gap-6 border-2 border-dark-red text-center`
);

export const LogoText = styled.h2(
  tw`text-h2 text-dark-red font-bangers tracking-wide`
);

export const Header = (): JSX.Element => {
  return (
    <div className="fixed inset-0 h-24 px-20 py-2 bg-white border border-border-grey flex justify-between items-center font-medium">
      <div className="flex items-center h-full basis-2/5 justify-between gap-1 md:gap-4">
        <Link to="/" className="hidden items-center h-full sm:flex ">
          <img
            src={FoogleLogo}
            alt="logo"
            className="h-full flex-1 object-cover shrink-0"
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
      <nav className="hidden lg:block basic-3/5">
        <Link to="/home" className="px-8 py-4">
          Home
        </Link>
        <Link to="/menu" className="px-8 py-4">
          Menu
        </Link>
        <Link to="/order" className="px-8 py-4">
          Order
        </Link>
      </nav>

      <div className="hidden md:flex items-center gap-4">
        <HeaderActionButton className="bg-dark-red text-white">
          <SvgCart />
          <span className="flex-1 text-center">3</span>
        </HeaderActionButton>
        <HeaderActionButton>
          <Link to="/login" className="block w-full">
            <span className="w-full">Login</span>
          </Link>
        </HeaderActionButton>
      </div>
    </div>
  );
};
