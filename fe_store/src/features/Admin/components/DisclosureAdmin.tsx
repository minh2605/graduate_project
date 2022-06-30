import { Disclosure, Transition } from "@headlessui/react";
import SvgChevronDown from "common/components/svg/ChevronDown";
import { Link, NavLink } from "react-router-dom";
interface DisclosureAdminOption {
  label: string;
  href: string;
}
interface DisclosureAdminProps {
  title: string;
  href: string;
  icon: JSX.Element;
  options?: DisclosureAdminOption[];
}

export const DisclosureAdmin = ({
  title,
  href,
  options,
  icon,
}: DisclosureAdminProps): JSX.Element => {
  return (
    <Disclosure>
      {({ open }) => (
        <>
          <NavLink
            to={href}
            className={`flex items-center w-full justify-between mb-2`}
          >
            {({ isActive }) => (
              <Disclosure.Button
                className={`flex items-center w-full gap-8 rounded-lg px-4 py-2 text-left text-white text-sm font-medium hover:bg-light-red focus:outline-none transition mb-2 ${
                  isActive ? "bg-dark-red" : "bg-dark-red-opacity"
                }`}
              >
                <span>{icon}</span>
                <span className="flex-1">{title}</span>
                {options && (
                  <SvgChevronDown
                    className={`transition ${
                      open ? "" : "rotate-180 transform"
                    }`}
                  />
                )}
              </Disclosure.Button>
            )}
          </NavLink>

          {/*
          Use the Transition + open render prop argument to add transitions.
        */}
          {options && (
            <Transition
              show={open}
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <Disclosure.Panel className="px-4 pb-2 text-sm " static>
                <div className="flex flex-col">
                  {options.map((it) => (
                    <Link to={it.href} key={it.label}>
                      {it.label}
                    </Link>
                  ))}
                </div>
              </Disclosure.Panel>
            </Transition>
          )}
        </>
      )}
    </Disclosure>
  );
};
