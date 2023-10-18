import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import type { PropsWithChildren } from "react";
import { HelmetProvider } from "react-helmet-async";
import { QueryClientProvider } from "react-query";

import { queryClient } from "@/lib/react-query";
import ThemeProvider from "@/theme";

import { AuthProvider } from "../Auth/AuthProvider";

export default function AppProvider({
  children,
}: PropsWithChildren): JSX.Element {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <AuthProvider>{children}</AuthProvider>
          </LocalizationProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}
