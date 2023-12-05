import { RouterProvider } from "react-router-dom";

import AppProvider from "@/providers";
import { router } from "@/routes/routes";

function App(): JSX.Element {
  return (
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  );
}

export default App;
