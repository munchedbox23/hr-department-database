import { Provider } from "react-redux";
import { ReactNode } from "react";
import { store } from "../config/appStore";

interface StoreProviderProps {
  /**
   * Default state for redux, including optional reducers
   */
  children?: ReactNode;
}

export const StoreProvider = ({ children }: StoreProviderProps) => {
  return <Provider store={store}>{children}</Provider>;
};
