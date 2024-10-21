import { RouterProvider } from "react-router-dom";
import { router } from "./providers/router";
import { AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { useAppDispatch } from "./providers/StoreProvider";
import { checkUserAuth } from "@/entities/user";

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkUserAuth());
  }, [dispatch]);

  return (
    <AnimatePresence mode="wait">
      <RouterProvider router={router} />
    </AnimatePresence>
  );
};

export default App;
