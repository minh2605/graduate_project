import { Link, useNavigate } from "react-router-dom";
import SvgClose from "common/components/svg/Close";
import SvgHome from "common/components/svg/Home";
import SvgOrder from "common/components/svg/Order";
import SvgAccount from "common/components/svg/Account";
import SvgPayment from "common/components/svg/Payment";
import SvgCart from "./svg/Cart";
import useAuth from "hooks/useAuth";
import SvgLogout from "./svg/Logout";
import API from "api/axios";
import { clearAuth } from "redux/slices/auth/authSlice";
import { useDispatch } from "redux/hook";

interface MenuBarProps {
  isMenuBarShow: boolean;
  onClose: () => void;
}

export const MenuBar = ({
  isMenuBarShow,
  onClose,
}: MenuBarProps): JSX.Element => {
  const { isLoggedIn } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleMenuBarClose = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    onClose();
  };
  const handleLogout = async () => {
    await API.delete("/auth/logout", {
      data: {
        refreshToken: localStorage.getItem("jwt_refresh_token"),
      },
    });
    dispatch(clearAuth());
    navigate("/");
  };
  return (
    <div
      className={`fixed z-fixed inset-y-0 left-0 w-full transition-transform ${
        isMenuBarShow ? "translate-x-0" : "-translate-x-full"
      }`}
      onClick={onClose}
    >
      <div className="bg-white h-full w-3/5 shadow-2xl sm:w-2/5 lg:w-1/4">
        <div className="py-6 px-8 flex items-center justify-between md:py-9">
          <SvgClose onClick={handleMenuBarClose} className="cursor-pointer" />
          <div className="flex items-center w-fit py-2 px-4 border rounded-3xl gap-6 border-2 border-dark-red text-center bg-dark-red text-white md:hidden">
            <SvgCart />
            <span className="flex-1 text-center">3</span>
          </div>
        </div>
        <nav className="flex flex-col">
          <Link
            to="/store/home"
            className="py-4 px-8 flex items-center gap-4 border-t border-border-grey"
          >
            <SvgHome />
            <span>Home</span>
          </Link>
          <Link
            to="/store/checkout"
            className="py-4 px-8 flex items-center gap-4 border-t border-border-grey"
          >
            <SvgPayment />
            <span>Checkout</span>
          </Link>
          <Link
            to="/store/order"
            className="py-4 px-8 flex items-center gap-4 border-t border-border-grey"
          >
            <SvgOrder />
            <span>Order</span>
          </Link>
          {isLoggedIn ? (
            <div
              className="py-4 px-8 flex items-center gap-4 border-t border-border-grey cursor-pointer"
              onClick={handleLogout}
            >
              <SvgLogout />
              <span>Logout</span>
            </div>
          ) : (
            <Link
              to="/public/sign-in"
              className="py-4 px-8 flex items-center gap-4 border-t border-border-grey"
            >
              <SvgAccount />
              <span>Sign up / Sign In</span>
            </Link>
          )}
        </nav>
      </div>
    </div>
  );
};
