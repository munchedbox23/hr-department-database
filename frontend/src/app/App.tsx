import { RouterProvider } from "react-router-dom";
import { router } from "./providers/router";
import { AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { useAppDispatch } from "./providers/StoreProvider";
import { checkUserAuth } from "@/entities/user";
import { AppLocalizationProvider } from "./providers/LocalizationProvider.tsx";
import { UserProvider } from "./providers/UserProvider";

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkUserAuth());
  }, [dispatch]);

  return (
    <AppLocalizationProvider>
      <AnimatePresence mode="wait">
        <UserProvider>
          <RouterProvider router={router} />
        </UserProvider>
      </AnimatePresence>
    </AppLocalizationProvider>
  );
};

export default App;
