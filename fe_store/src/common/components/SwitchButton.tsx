import { useState } from "react";
import { Switch } from "@headlessui/react";
import { useFormikContext } from "formik";
import { ToggleOrderTypeFormValue } from "./OrderTypeBar";
interface SwitchButtonProps {
  name: string;
  label: string;
  checked: boolean;
}
export const SwitchButton = ({
  name,
  label,
  checked,
}: SwitchButtonProps): JSX.Element => {
  const [enabled, setEnabled] = useState(false);
  const { setFieldValue } = useFormikContext<ToggleOrderTypeFormValue>();

  return (
    <div className="flex items-center gap-2">
      <span
        className={`${
          enabled ? "text-dark-red" : "text-light-grey"
        } transition-colors`}
      >
        {label}
      </span>
      <Switch
        type="submit"
        name={name}
        checked={enabled}
        onChange={() => {
          setEnabled((enabled) => !enabled);
          setFieldValue(name, !checked);
        }}
        value={name}
        className={`${enabled ? "bg-dark-red" : "bg-light-grey"}
          relative inline-flex items-center h-8 w-16 shrink-0 cursor-pointer rounded-full border border-border-grey transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
      >
        <span
          aria-hidden="true"
          className={`${enabled ? "translate-x-9" : "translate-x-1"}
            pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
        />
      </Switch>
    </div>
  );
};
