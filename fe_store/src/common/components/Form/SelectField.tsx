import { ErrorMessage } from "formik";
import React, { useMemo } from "react";
import Select from "react-select";
interface SelectFieldProps<T extends object> {
  label: string;
  name: string;
  options: any[];
  defaultValue: any;
  onChange: (selectOption: SelectFieldOptionsProps<T>) => void;
  setFieldValue: (field: string, value: any) => void;
  dependValue?: any;
  dependField?: string;
  isDisable?: boolean;
  value?: string;
}

export interface SelectFieldOptionsProps<T extends any> {
  value: T;
  label: string;
  [x: string]: any | undefined;
}

export const SelectField = <T extends object>({
  label,
  name,
  options,
  onChange,
  setFieldValue,
  dependValue,
  dependField,
  defaultValue,
  isDisable,
  value,
}: SelectFieldProps<T>) => {
  const currentValue = useMemo(() => {
    if (value) {
      return options.find((it) => {
        return it.value === value;
      });
    }
  }, [options, value]);
  const cleanOptions = useMemo(() => {
    if (dependField && dependValue) {
      return options.filter((it) => {
        return it[dependField] === dependValue;
      });
    } else return options;
  }, [options, dependField, dependValue]);
  // console.log("cleanOptions", cleanOptions);

  const handleSelectedOptionChange = (value: any) => {
    setFieldValue(name, value.value);
  };
  return (
    <div className="flex flex-col gap-2 mb-4 text-base">
      <label htmlFor="name">{label}*</label>

      <Select
        options={cleanOptions}
        defaultValue={defaultValue}
        value={currentValue}
        onChange={handleSelectedOptionChange}
        isDisabled={isDisable}
      />
      <ErrorMessage
        name={name}
        component="div"
        className={`text-light-red text-xs`}
      />
    </div>
  );
};
