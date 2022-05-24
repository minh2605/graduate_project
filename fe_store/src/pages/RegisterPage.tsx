import API from "api/axios";
import { Button } from "common/components/Button";
import SvgLeftArrow from "common/components/svg/LeftArrow";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useLoading } from "hooks/useLoading";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";

interface SigninPageProps {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
export const RegisterPage = (): JSX.Element => {
  const [showLoading, hideLoading] = useLoading();
  const navigate = useNavigate();
  const initialValues: SigninPageProps = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const registerSchema: yup.SchemaOf<SigninPageProps> = yup.object().shape({
    name: yup.string().required("This field is required!"),
    email: yup
      .string()
      .required("This field is required!")
      .email("Email format is incorrect!"),
    password: yup
      .string()
      .required("This field is required!")
      .min(6, "Password must be larger than 6 characters"),
    confirmPassword: yup
      .string()
      .required("This field is required!")
      .test(
        "confirm-password",
        "Confirm password doest not match",
        (value, context) => {
          return value === context.parent.password;
        }
      ),
  });

  const handleRegister = async (values: Partial<SigninPageProps>) => {
    const { email, password, name } = values;
    const registerValues = {
      name,
      email,
      password,
    };
    try {
      showLoading();
      const data = await API.post("auth/register", registerValues);
      if (data.status) {
        hideLoading();
        toast.success("Create account successfully");
        navigate("../sign-in");
      }
    } catch (error) {
      hideLoading();
      toast.error("Email is already taken");
    }
  };

  return (
    <div className="flex flex-col">
      <div className="px-14 flex flex-col ">
        <div className="flex items-center gap-2 text-h1 font-bold mb-8 text-dark-red">
          <Link to="../sign-in">
            <SvgLeftArrow width={32} height={32} />
          </Link>
          <h1>Sign up</h1>
        </div>
        <Formik
          validateOnBlur={false}
          validateOnChange={false}
          initialValues={initialValues}
          validationSchema={registerSchema}
          onSubmit={(values) => handleRegister(values)}
        >
          <Form
            autoComplete="off"
            noValidate
            className="flex flex-col font-medium"
          >
            <div className="px-20 flex flex-col">
              <div className="flex flex-col gap-2 mb-4 text-base">
                <label htmlFor="name">Name*</label>
                <Field
                  name="name"
                  type="text"
                  className="border py-2 px-4 rounded text-sm"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className={`text-light-red text-xs`}
                />
              </div>
              <div className="flex flex-col gap-2 mb-4 text-base">
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
              <div className="flex flex-col gap-2 mb-8 text-base">
                <label htmlFor="password">Confirm Password*</label>
                <Field
                  name="confirmPassword"
                  type="password"
                  className="border py-2 px-4 rounded text-sm"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className={`text-light-red text-xs`}
                />
              </div>
              <Button
                className="flex items-center gap-4 w-full justify-center mt-2 mb-4"
                type="submit"
              >
                <span>Sign up</span>
              </Button>
              <div className="flex items-center gap-2 text-sm m-auto">
                <span>Already have an account?</span>
                <Link to="../sign-in" className="text-base hover:text-dark-red">
                  <span>Sign in</span>
                </Link>
              </div>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};
