import { Button } from "common/components/Button";
import SvgLeftArrow from "common/components/svg/LeftArrow";
import { Formik, Field, Form, ErrorMessage, FormikValues } from "formik";
import { useLoading } from "hooks/useLoading";
import { Link, useSearchParams } from "react-router-dom";
import * as yup from "yup";
import API from "api/axios";

interface ResetPasswordPageProps {
  password: string;
  confirmPassword: string;
}
export const ResetPasswordPage = (): JSX.Element => {
  const [showLoading, hideLoading] = useLoading();
  const [searchParams] = useSearchParams();
  const resetToken = searchParams.get("token");

  const initialValues: ResetPasswordPageProps = {
    password: "",
    confirmPassword: "",
  };
  const resetPasswordSchema: yup.SchemaOf<ResetPasswordPageProps> = yup
    .object()
    .shape({
      password: yup.string().required("This field is required!"),
      confirmPassword: yup.string().required("This field is required!"),
    });

  const handleForgotPassword = async (values: FormikValues) => {
    delete values.confirmPassword;
    try {
      if (resetToken) {
        showLoading();
        await API.post(
          `auth/reset-password?token=${resetToken}`,
          values.password
        );
      }
    } catch (error) {
      hideLoading();
    }
  };

  return (
    <div className="flex flex-col">
      <div className="px-14 flex flex-col ">
        <div className="flex items-center gap-2 text-h1 font-bold mb-8 text-dark-red">
          <Link to="../sign-in">
            <SvgLeftArrow width={32} height={32} />
          </Link>
          <h1>Enter new password</h1>
        </div>
        <Formik
          validateOnBlur={false}
          validateOnChange={false}
          initialValues={initialValues}
          validationSchema={resetPasswordSchema}
          onSubmit={(values) => {
            handleForgotPassword(values);
          }}
        >
          <Form
            autoComplete="off"
            noValidate
            className="flex flex-col font-medium"
          >
            <div className="px-20 flex flex-col">
              <div className="flex flex-col flex-1 gap-2 mb-4 text-base">
                <label htmlFor="email">Password*</label>
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
              <div className="flex flex-col flex-1 gap-2 mb-4 text-base">
                <label htmlFor="email">Confirm Password*</label>
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
                <span>Send</span>
              </Button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};
