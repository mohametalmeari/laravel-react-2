import { RouterProvider } from "react-router";
import { RootLayout } from "./layouts/RootLayout";
import { router } from "./router";
import { StateProvider } from "./contexts/store";

function App() {
  return (
    <StateProvider>
      <RootLayout>
        <RouterProvider {...{ router }} />
      </RootLayout>
    </StateProvider>
  );
}

export default App;
