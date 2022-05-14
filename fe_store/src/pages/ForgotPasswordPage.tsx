import { Button } from "common/components/Button";
import SvgLeftArrow from "common/components/svg/LeftArrow";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import * as yup from "yup";

interface SigninPageProps {
  email: string;
}
export const ForgotPasswordPage = (): JSX.Element => {
  const initialValues: SigninPageProps = {
    email: "",
  };
  const forgotPasswordSchema: yup.SchemaOf<SigninPageProps> = yup
    .object()
    .shape({
      email: yup
        .string()
        .required("This field is required!")
        .email("Email format is incorrect!"),
    });

  return (
    <div className="flex flex-col">
      <div className="px-14 flex flex-col ">
        <div className="flex items-center gap-2 text-h1 font-bold mb-8 text-dark-red">
          <Link to="../sign-in">
            <SvgLeftArrow width={32} height={32} />
          </Link>
          <h1>Reset your password</h1>
        </div>
        <Formik
          validateOnBlur={false}
          validateOnChange={false}
          initialValues={initialValues}
          validationSchema={forgotPasswordSchema}
          onSubmit={(values) => {
            console.log("values submit", values);
          }}
        >
          <Form
            autoComplete="off"
            noValidate
            className="flex flex-col font-medium"
          >
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
              <Button
                className="flex items-center gap-4 w-full justify-center mt-2 mb-4"
                type="submit"
              >
                <span>Reset</span>
              </Button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};
