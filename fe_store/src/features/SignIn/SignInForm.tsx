import { Button } from "common/components/Button";
import SvgGoogle from "common/components/svg/Google";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";

interface SigninFormProps {
  email: string;
  password: string;
}
export const SigninForm = (): JSX.Element => {
  const initialValues: SigninFormProps = {
    email: "",
    password: "",
  };
  const loginSchema: yup.SchemaOf<SigninFormProps> = yup.object().shape({
    email: yup
      .string()
      .required("This field is required!")
      .email("Email format is incorrect!"),
    password: yup
      .string()
      .required("This field is required!")
      .min(6, "Password must be larger than 6 characters"),
  });

  return (
    <div className="flex flex-col">
      <div className="px-14 flex flex-col ">
        <h1 className="text-h1 font-bold mb-4">Sign in</h1>
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
          onSubmit={(values) => {
            console.log("values submit", values);
          }}
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
            <div className="px-20">
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
              <div className="flex flex-col gap-2 mb-8 text-base">
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
              <Button
                className="flex items-center gap-4 w-full justify-center mt-2 mb-8"
                type="submit"
              >
                <span>Sign in</span>
              </Button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};
