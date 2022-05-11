import FoogleLogo from "assets/svg/foogle-logo.svg";
import LoginBanner from "assets/images/login-banner.jpg";
import { SigninForm } from "features/SignIn/SignInForm";

export const SigninPage = (): JSX.Element => {
  return (
    <div className="flex max-h-screen max-w-full">
      <div className="basis-1/2 py-8 px-20">
        <div className="flex items-center h-44">
          <img src={FoogleLogo} alt="logo" className="h-full object-cover" />
        </div>
        <SigninForm />
      </div>
      <div className="basis-1/2">
        <img
          src={LoginBanner}
          alt="login-banner"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};
