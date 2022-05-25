import { useSelector } from "redux/hook";
import { RootState } from "redux/rootReducer";
import { AuthState } from "redux/slices/auth/authSlice";
import useLocalStorage from "./useLocalStorage";

type AuthType = AuthState & {
  jwt_token: string | null;
};

const useAuth = (): AuthType => {
  const authState = useSelector((state: RootState) => state.auth);
  const [getToken] = useLocalStorage("jwt_token");

  return {
    ...authState,
    jwt_token: getToken(),
  };
};

export default useAuth;
