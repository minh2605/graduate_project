import { ErrorMessage } from "formik";
import { ChangeEvent } from "react";
interface TextAreaFieldProps {
  label: string;
  name: string;
  value: string;
  rows?: number;
  className?: string;
  onChange: (e: ChangeEvent<any>) => void;
}

export const TextAreaField = ({
  label,
  name,
  className,
  rows = 5,
  value,
  onChange,
}: TextAreaFieldProps) => {
  return (
    <div className="flex flex-col gap-2 mb-4 text-base">
      <label htmlFor="name">{label}*</label>

      <textarea
        name={name}
        value={value}
        rows={rows}
        className="border py-2 px-4 rounded text-sm resize-none"
        onChange={onChange}
      />
      <ErrorMessage
        name={name}
        component="div"
        className={`text-light-red text-xs`}
      />
    </div>
  );
};
