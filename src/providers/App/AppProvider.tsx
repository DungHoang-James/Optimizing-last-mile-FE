import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { SnackbarProvider } from "notistack";
import type { PropsWithChildren } from "react";
import { HelmetProvider } from "react-helmet-async";
import { QueryClientProvider } from "react-query";

import { Notification } from "@/components/notification";
import { queryClient } from "@/lib/react-query";
import ThemeProvider from "@/theme";

import { AuthProvider } from "../Auth/AuthProvider";

declare module "notistack" {
  interface VariantOverrides {
    notification: true;
  }
}

export default function AppProvider({
  children,
}: PropsWithChildren): JSX.Element {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <SnackbarProvider
              autoHideDuration={3000}
              maxSnack={3}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              Components={{
                notification: Notification,
              }}
            >
              <AuthProvider>{children}</AuthProvider>
            </SnackbarProvider>
          </LocalizationProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}
