import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "redux/hook";
import { clearAuth } from "redux/slices/auth/authSlice";
import tw, { styled } from "twin.macro";
import API from "api/axios";

const DropDownTab = styled.div(
  tw`block px-4 py-2 hover:bg-light-red hover:text-white `
);

interface ProfileDropDownProps {
  isAdmin: boolean;
}
export const ProfileDropDown = ({
  isAdmin,
}: ProfileDropDownProps): JSX.Element => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
    <div className="z-dropdown absolute top-full mt-2 w-40 bg-white shadow-xl rounded overflow-hidden flex flex-col gap-2">
      {isAdmin && (
        <Link to="/admin">
          <DropDownTab>Dashboard</DropDownTab>
        </Link>
      )}
      <Link to="/profile">
        <DropDownTab>Profile</DropDownTab>
      </Link>
      <Link to="/history">
        <DropDownTab>History</DropDownTab>
      </Link>
      <DropDownTab onClick={handleLogout}>Logout</DropDownTab>
    </div>
  );
};
