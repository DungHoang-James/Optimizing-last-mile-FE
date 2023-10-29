import { Box, Container, Stack, Typography } from "@mui/material";
import { Helmet } from "react-helmet-async";

export default function OrderPage() {
  return (
    <>
      <Helmet>
        <title>Orders</title>
      </Helmet>
      <Container>
        <Stack alignItems={"center"} justifyContent={"center"}>
          <Stack spacing={10}>
            <Stack spacing={2} alignItems={"center"}>
              <Typography variant={"h3"}>Coming Soon</Typography>
              <Typography variant={"body1"}>
                We are currently working hard on this page!
              </Typography>
            </Stack>
            <Box
              component="img"
              src="/assets/illustrations/illustration_coming_soon.svg"
              sx={{ height: 240 }}
            />
          </Stack>
        </Stack>
      </Container>
    </>
  );
}
