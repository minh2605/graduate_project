import { RadioGroup } from "@headlessui/react";
import { SelectFieldOptionsProps } from "common/components/Form/SelectField";
import SvgCheck from "common/components/svg/Check";
import { PaymentType } from "features/Checkout/CheckoutForm";
import { useFormikContext } from "formik";

interface PaymentTypeRadioGroupProps {
  options: SelectFieldOptionsProps<PaymentType>[];
  selected: SelectFieldOptionsProps<PaymentType>;
  setSelected: (value: SelectFieldOptionsProps<PaymentType>) => void;
}
export const PaymentTypeRadioGroup = ({
  options,
  selected,
  setSelected,
}: PaymentTypeRadioGroupProps): JSX.Element => {
  const { setFieldValue } = useFormikContext();
  const handleRadioChecked = (value: SelectFieldOptionsProps<PaymentType>) => {
    setSelected(value);
    setFieldValue("payment_type", selected.value);
  };

  return (
    <div className="w-full">
      <div className="w-full">
        <RadioGroup
          value={selected}
          onChange={(value) => {
            handleRadioChecked(value);
          }}
        >
          <div className="flex gap-4">
            {options.map((type) => (
              <RadioGroup.Option
                key={type.label}
                value={type}
                className={({ active, checked }) =>
                  `${
                    active
                      ? "ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300"
                      : ""
                  }
                  ${
                    checked
                      ? "bg-light-red bg-opacity-75 text-white"
                      : "bg-white"
                  }
                    relative flex basis-1/2 cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
                }
              >
                {({ active, checked }) => (
                  <>
                    <div className="flex w-full items-center justify-between">
                      <div className="flex items-center">
                        <div className="text-sm">
                          <RadioGroup.Label
                            as="p"
                            className={`font-medium  ${
                              checked ? "text-white" : "text-gray-900"
                            }`}
                          >
                            {type.label}
                          </RadioGroup.Label>
                          <RadioGroup.Description
                            as="span"
                            className={`block ${
                              checked ? "text-sky-100" : "text-gray-500"
                            }`}
                          >
                            {type.icon}
                          </RadioGroup.Description>
                        </div>
                      </div>
                      {checked && (
                        <div className="shrink-0 text-black">
                          <SvgCheck className="h-6 w-6" />
                        </div>
                      )}
                    </div>
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};
