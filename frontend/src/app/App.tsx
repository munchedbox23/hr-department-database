import { RouterProvider } from "react-router-dom";
import { router } from "./providers/router";
import { AnimatePresence } from "framer-motion";

const App = () => {
  return (
    <AnimatePresence mode="wait">
      <RouterProvider router={router} />
    </AnimatePresence>
  );
};

export default App;
