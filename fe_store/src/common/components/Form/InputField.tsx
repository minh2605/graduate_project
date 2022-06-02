import { ErrorMessage, Field } from "formik";
interface InputFieldProps {
  label: string;
  name: string;
  type?: string;
  className?: string;
}

export const InputField = ({
  label,
  name,
  type = "text",
  className,
}: InputFieldProps) => {
  return (
    <div className="flex flex-col gap-2 mb-4 text-base">
      <label htmlFor="name">{label}*</label>

      <Field
        name={name}
        type={type}
        className="border py-2 px-4 rounded text-sm"
      />
      <ErrorMessage
        name={name}
        component="div"
        className={`text-light-red text-xs`}
      />
    </div>
  );
};
