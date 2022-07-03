import { Tab } from "@headlessui/react";
import { SelectFieldOptionsProps } from "./Form/SelectField";

export interface ProductFilterProps {
  selectedTab: number;
  tabList: SelectFieldOptionsProps<string>[];
  setSelectedTab: (value: number) => void;
  setSelectedOption: (value: SelectFieldOptionsProps<string>) => void;
  resetPage: () => void;
}

export const ProductTypesFilter = ({
  tabList,
  selectedTab,
  setSelectedTab,
  setSelectedOption,
  resetPage,
}: ProductFilterProps): JSX.Element => {
  const handleTabChange = (index: number) => {
    setSelectedTab(index);
    setSelectedOption({
      value: "",
      label: "All",
      productTypeId: "",
    });
    resetPage();
  };

  return (
    <div className="basis-1/2 sm:px-0">
      <Tab.Group
        selectedIndex={selectedTab}
        onChange={(index) => handleTabChange(index)}
      >
        <Tab.List className="flex space-x-1 rounded-xl bg-light-red p-1">
          {tabList.map((type) => (
            <Tab
              key={type.value}
              className={({ selected }) => {
                return `w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2 ${
                  selected
                    ? "bg-white shadow"
                    : "text-white hover:bg-white/[0.12] hover:text-white"
                }`;
              }}
            >
              {type.label}
            </Tab>
          ))}
        </Tab.List>
      </Tab.Group>
    </div>
  );
};
