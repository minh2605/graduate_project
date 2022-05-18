import { HeaderAdmin } from "features/Admin/components/HeaderAdmin";
import { SidebarAdmin } from "features/Admin/components/SideBarAdmin";
import { ReactNode, useState } from "react";
interface DashboardLayoutProps {
  children: ReactNode;
}
export const DashboardLayout = ({
  children,
}: DashboardLayoutProps): JSX.Element => {
  const [isToggle, setToggle] = useState(false);
  return (
    <div className="flex items-center">
      <SidebarAdmin isToggle={isToggle} />
      <HeaderAdmin isToggle={isToggle} setToggle={setToggle} />
      <div
        className={`${
          isToggle ? "ml-0" : "ml-72"
        } w-full mt-20 px-6 pt-6 transition-all`}
      >
        {children}
      </div>
    </div>
  );
};
