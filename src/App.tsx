import { RouterProvider } from "react-router-dom";

import AppProvider from "@/providers";
import { router } from "@/routes/routes";

import { SnackbarHost } from "./components/snackbar";

function App(): JSX.Element {
  return (
    <AppProvider>
      <RouterProvider router={router} />
      <SnackbarHost />
    </AppProvider>
  );
}

export default App;
