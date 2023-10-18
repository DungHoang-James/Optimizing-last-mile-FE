import SvgColor from "@/components/svg-color";
import type { NavConfig } from "@/types/NavConfig";

const icon = (name: string) => (
  <SvgColor
    src={`/assets/icons/navbar/${name}.svg`}
    sx={{ width: 1, height: 1 }}
  />
);

const navConfig: NavConfig[] = [
  {
    title: "Managers",
    path: "/dashboard/managers",
    icon: icon("ic_user"),
  },
  {
    title: "Profile",
    path: "/dashboard/profile",
    icon: icon("ic_user"),
  },
  {
    title: "Setting",
    path: "/dashboard/setting",
    icon: icon("ic_user"),
  },
];

const managerNavConfig: NavConfig[] = [
  {
    title: "Order",
    path: "/dashboard/order",
    icon: icon("ic_analytics"),
  },
  {
    title: "Driver",
    path: "/dashboard/driver",
    icon: icon("ic_analytics"),
  },
];

export { navConfig, managerNavConfig };
