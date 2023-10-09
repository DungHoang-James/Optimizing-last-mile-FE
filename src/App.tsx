import { HelmetProvider } from "react-helmet-async";
import { RouterProvider } from "react-router-dom";

import { router } from "@/routes/routes";
import ThemeProvider from "@/theme";

function App(): JSX.Element {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
