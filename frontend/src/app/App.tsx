import { RouterProvider } from "react-router-dom";
import { router } from "./providers/router";
import { AnimatePresence } from "framer-motion";
import { useLayoutEffect } from "react";
import { useAppDispatch } from "./providers/StoreProvider";
import { checkUserAuth } from "@/entities/user";
import { AppLocalizationProvider } from "./providers/LocalizationProvider.tsx";

const App = () => {
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    dispatch(checkUserAuth());
  }, [dispatch]);

  return (
    <AppLocalizationProvider>
      <AnimatePresence mode="wait">
        <RouterProvider router={router} />
      </AnimatePresence>
    </AppLocalizationProvider>
  );
};

export default App;
