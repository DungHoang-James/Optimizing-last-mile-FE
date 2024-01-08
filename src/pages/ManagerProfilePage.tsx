import { Container } from "@mui/material";
import { Helmet } from "react-helmet-async";

import { ManagerProfileTab } from "@/sections/dashboard/manager-profile";

export default function ManagerProfilePage() {
  return (
    <>
      <Helmet>Profile</Helmet>
      <Container>
        <ManagerProfileTab />
      </Container>
    </>
  );
}
