import {
  AccountBoxRounded as ProfileIcon,
  PasswordRounded as PasswordIcon,
} from "@mui/icons-material";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import { omit } from "lodash";
import type { ReactNode } from "react";
import { useState } from "react";
import { useQuery } from "react-query";

import { Loading } from "@/components/loading";
import { useAuth } from "@/hooks";
import { fetchWithGet } from "@/lib/request";
import type { AccountResponse } from "@/types";

import { ManagerProfileChangePassword, ManagerProfileForm } from ".";

type TabPanelProps = {
  children?: ReactNode;
  index: number;
  value: number;
};

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3, px: 0.5 }}>{children}</Box>}
    </Box>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function ManagerProfileTab() {
  const [value, setValue] = useState(0);

  const { state } = useAuth();

  const { data, isLoading, isFetching } = useQuery({
    queryKey: [`/account-profile/${state.id}`],
    queryFn: ({ queryKey, signal }) =>
      fetchWithGet<AccountResponse>({ queryKey, signal }),
    select: (data) => {
      const defaultValues = {
        email: data?.data.result?.email || "",
        name: data?.data.result?.accountProfile?.name || "",
        birthDay: data?.data.result?.accountProfile.birthDay as any,
        province: data?.data.result?.accountProfile?.province || "",
        district: data?.data.result?.accountProfile?.district || "",
        ward: data?.data.result?.accountProfile?.ward || "",
        address: data?.data.result?.accountProfile?.address || "",
        phoneContact: data?.data.result?.accountProfile?.phoneContact || "",
      };

      return defaultValues;
    },
    enabled: !!state.id,
  });

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  if (!state.id || !data || isLoading || isFetching) return <Loading />;
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab
            label={
              <Typography variant="h6" gutterBottom>
                Profile
              </Typography>
            }
            icon={<ProfileIcon />}
            iconPosition={"start"}
            {...a11yProps(0)}
          />
          <Tab
            label={
              <Typography variant="h6" gutterBottom>
                Change password
              </Typography>
            }
            icon={<PasswordIcon />}
            iconPosition={"start"}
            {...a11yProps(1)}
          />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <ManagerProfileForm
          id={state.id}
          data={omit(data, "email")}
          isLoading={!data || isLoading || isFetching}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <ManagerProfileChangePassword
          email={data.email}
          isLoading={!data || isLoading || isFetching}
        />
      </CustomTabPanel>
    </Box>
  );
}
