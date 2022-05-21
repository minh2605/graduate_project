import API from "api/axios";
import { Button } from "common/components/Button";
import SvgGoogle from "common/components/svg/Google";
import SvgLeftArrow from "common/components/svg/LeftArrow";
import { Formik, Field, Form, ErrorMessage, FormikValues } from "formik";
import { useLoading } from "hooks/useLoading";
import { Link, useNavigate } from "react-router-dom";
import { LoginResponseProps } from "types/auth";
import * as yup from "yup";

interface SigninPageProps {
  email: string;
  password: string;
}
export const SigninPage = (): JSX.Element => {
  const navigate = useNavigate();
  const [showLoading, hideLoading] = useLoading();
  const initialValues: SigninPageProps = {
    email: "",
    password: "",
  };
  const loginSchema: yup.SchemaOf<SigninPageProps> = yup.object().shape({
    email: yup
      .string()
      .required("This field is required!")
      .email("Email format is incorrect!"),
    password: yup.string().required("This field is required!"),
    // .min(5, "Password must be larger than 5 characters"),
  });

  const handleLogin = async (values: FormikValues) => {
    try {
      showLoading();
      const data: LoginResponseProps = await API.post("auth/login", values);
      localStorage.setItem("jwt_token", data.tokens.access.token);
      hideLoading();
      navigate("/");
    } catch (error) {
      hideLoading();
    }
  };

  return (
    <div className="flex flex-col">
      <div className="px-14 flex flex-col ">
        <div className="flex items-center gap-2 text-h1 font-bold mb-8 text-dark-red">
          <Link to="../../../home">
            <SvgLeftArrow width={32} height={32} />
          </Link>
          <h1>Sign in</h1>
        </div>
        <div className="flex flex-col items-center">
          <Button
            className="flex items-center gap-4 w-1/2 justify-center mb-8"
            variant="white"
            type="button"
          >
            <SvgGoogle />
            <span>Sign in with Google</span>
          </Button>
        </div>
        <Formik
          validateOnBlur={false}
          validateOnChange={false}
          initialValues={initialValues}
          validationSchema={loginSchema}
          onSubmit={(values) => handleLogin(values)}
        >
          <Form
            autoComplete="off"
            noValidate
            className="flex flex-col font-medium"
          >
            <div className="h-[1px] bg-border-grey text-light-grey w-full relative mb-8">
              <span className="text-sm p-4 bg-white absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2">
                or Sign in with Email
              </span>
            </div>
            <div className="px-20 flex flex-col">
              <div className="flex flex-col flex-1 gap-2 mb-4 text-base">
                <label htmlFor="email">Email*</label>
                <Field
                  name="email"
                  type="text"
                  className="border py-2 px-4 rounded text-sm"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className={`text-light-red text-xs`}
                />
              </div>
              <div className="flex flex-col gap-2 mb-4 text-base">
                <label htmlFor="password">Password*</label>
                <Field
                  name="password"
                  type="password"
                  className="border py-2 px-4 rounded text-sm"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className={`text-light-red text-xs`}
                />
              </div>
              <div className="text-sm mb-4">
                <Link
                  to="../forgot-password"
                  className="m-auto hover:text-dark-red"
                >
                  <span>Forgot password?</span>
                </Link>
              </div>
              <Button
                className="flex items-center gap-4 w-full justify-center mt-2 mb-4"
                type="submit"
              >
                <span>Sign in</span>
              </Button>

              <div className="flex items-center gap-2 text-sm m-auto">
                <span>Don't have an account?</span>
                <Link to="../sign-up" className="m-auto hover:text-dark-red">
                  <span>Sign up</span>
                </Link>
              </div>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};
