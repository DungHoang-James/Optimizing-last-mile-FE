import BarChartIcon from "@mui/icons-material/BarChart";
import LogoutIcon from "@mui/icons-material/Logout";
import MopedIcon from "@mui/icons-material/Moped";
import PersonIcon from "@mui/icons-material/Person";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";

import type { NavConfig } from "@/types/NavConfig";

const navConfig: NavConfig[] = [
  {
    title: "Dashboard",
    path: "/dashboard/overview",
    icon: <BarChartIcon />,
  },
  {
    title: "Profile",
    path: "/dashboard/profile",
    icon: <PersonIcon />,
  },
  {
    title: "Managers",
    path: "/dashboard/managers",
    icon: <SupervisedUserCircleIcon />,
  },
];

const managerNavConfig: NavConfig[] = [
  {
    title: "Dashboard",
    path: "/dashboard/manager-overview",
    icon: <BarChartIcon />,
  },
  {
    title: "Profile",
    path: "/dashboard/manager-profile",
    icon: <PersonIcon />,
  },
  {
    title: "Drivers",
    path: "/dashboard/drivers",
    icon: <MopedIcon />,
  },
  {
    title: "Orders",
    path: "/dashboard/orders",
    icon: <ReceiptLongIcon />,
  },
];
const logoutNav: NavConfig = {
  title: "Logout",
  path: "/login",
  icon: <LogoutIcon />,
};

export { logoutNav, managerNavConfig, navConfig };
