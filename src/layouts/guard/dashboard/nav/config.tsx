import LogoutIcon from "@mui/icons-material/Logout";
import MopedIcon from "@mui/icons-material/Moped";
import PersonIcon from "@mui/icons-material/Person";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import SettingsIcon from "@mui/icons-material/Settings";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";

import type { NavConfig } from "@/types/NavConfig";

const navConfig: NavConfig[] = [
  {
    title: "Managers",
    path: "/dashboard/managers",
    icon: <SupervisedUserCircleIcon />,
  },
  {
    title: "Profile",
    path: "/dashboard/profile",
    icon: <PersonIcon />,
  },
  {
    title: "Setting",
    path: "/dashboard/setting",
    icon: <SettingsIcon />,
  },
];

const managerNavConfig: NavConfig[] = [
  {
    title: "Drivers",
    path: "/dashboard/drivers",
    icon: <MopedIcon />,
  },
  {
    title: "Profile",
    path: "/dashboard/profile",
    icon: <PersonIcon />,
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

export { managerNavConfig, navConfig, logoutNav };
