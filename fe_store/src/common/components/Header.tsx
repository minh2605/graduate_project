import FoogleLogo from "assets/images/foogle-logo.png";
import { Link } from "react-router-dom";
import SvgSearch from "common/components/svg/Search";
import SvgCart from "common/components/svg/Cart";
import tw, { styled } from "twin.macro";

const HeaderSeachBar = styled.div(
  tw`flex items-center border rounded-3xl p-2 ml-8`
);

const HeaderActionButton = styled.div(
  tw`flex items-center w-32 py-2 px-4 border rounded-3xl gap-6`
);

export const Header = (): JSX.Element => {
  return (
    <div className="h-24 px-20 py-2.5 bg-light-white flex justify-between items-center font-medium">
      <div className="flex items-center h-full basis-2/5">
        <Link to="/" className="block flex items-center h-full">
          <img src={FoogleLogo} alt="logo" className="h-full" />
          <h2 className="text-h2">Foogle</h2>
        </Link>
        <HeaderSeachBar>
          <input
            type="text"
            className="bg-light-white border-0 focus:outline-none px-4 text-sm"
          />
          <SvgSearch />
        </HeaderSeachBar>
      </div>
      <nav className="basic-3/5">
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

      <div className="flex items-center gap-4">
        <HeaderActionButton>
          <SvgCart />
          <span className="flex-1 text-center">3</span>
        </HeaderActionButton>
        <HeaderActionButton>
          <span className="w-full text-center">Login</span>
        </HeaderActionButton>
      </div>
    </div>
  );
};
