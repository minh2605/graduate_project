import { Fragment, useEffect, useMemo, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import SvgChevronDown from "./svg/ChevronDown";
import SvgCheck from "./svg/Check";
import { SelectFieldOptionsProps } from "./Form/SelectField";

export interface CategoriesFilterProps {
  options: SelectFieldOptionsProps<string>[];
  onSelected: (value: SelectFieldOptionsProps<string>) => void;
  productTypeId: string;
  resetPage: () => void;
}

export const CategoriesFilter = ({
  options,
  onSelected,
  productTypeId,
  resetPage,
}: CategoriesFilterProps): JSX.Element => {
  const newOptions = useMemo(() => {
    return [...options.filter((it) => it.productTypeId === productTypeId)];
  }, [productTypeId, options]);
  const [optionSelected, setOptionSelected] = useState<
    SelectFieldOptionsProps<string>
  >(newOptions[0]);

  useEffect(() => {
    if (newOptions.length > 0) {
      resetPage();
      setOptionSelected(newOptions[0]);
    }
  }, [newOptions, resetPage]);
  return !!productTypeId && options.length > 0 ? (
    <div className="basis-1/2">
      <Listbox
        value={optionSelected}
        onChange={(value) => {
          setOptionSelected(value);
          onSelected(value);
        }}
        disabled={!productTypeId}
      >
        <div className="relative mt-1">
          <Listbox.Button className="relative bg-light-red w-full cursor-default rounded-lg text-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block truncate">{optionSelected?.label}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <SvgChevronDown />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {newOptions.map((option, personIdx) => (
                <Listbox.Option
                  key={personIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active && "bg-light-red-opacity"
                    }`
                  }
                  value={option}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {option.label}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-light-red">
                          <SvgCheck className="h-4 w-4" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  ) : (
    <></>
  );
};
