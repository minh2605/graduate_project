import { DisclosureAdmin } from "./DisclosureAdmin";
import FoogleLogo from "assets/svg/foogle-logo.svg";
import { Link } from "react-router-dom";
import SvgDashboard from "common/components/svg/Dashboard";
import SvgOrder from "common/components/svg/Order";
import SvgItem from "common/components/svg/Item";

interface SideBarAdminProps {
  isToggle: boolean;
}

export const SidebarAdmin = ({ isToggle }: SideBarAdminProps): JSX.Element => {
  return (
    <div
      className={`fixed inset-y-0 left-0 border-r w-72 p-4 transition-all ${
        isToggle ? "-translate-x-full" : "translate-x-0"
      }`}
    >
      <div className="flex justify-center items-center h-28">
        <Link to="/" className="h-full">
          <img src={FoogleLogo} alt="logo" className="h-full object-cover" />
        </Link>
      </div>
      <DisclosureAdmin
        title="Dashboard"
        href="../dashboard"
        icon={<SvgDashboard />}
        options={[
          { label: "A", href: "./dashboard/a" },
          { label: "B", href: "./dashboard/b" },
        ]}
      />
      <DisclosureAdmin
        title="Orders"
        href="../order"
        icon={<SvgOrder color="white" />}
        options={[
          { label: "A", href: "./order/a" },
          { label: "B", href: "./order/b" },
        ]}
      />
      <DisclosureAdmin
        title="Product"
        href="../product"
        icon={<SvgItem color="white" />}
        options={[
          { label: "A", href: "./product/a" },
          { label: "B", href: "./product/b" },
        ]}
      />
    </div>
  );
};
