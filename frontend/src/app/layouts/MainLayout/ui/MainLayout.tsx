import { FC } from "react";
import styles from "./MainLayout.module.css";
import { Outlet } from "react-router-dom";
import { AppHeader } from "@/widgets/Header";

export const MainLayout: FC = () => {
  return (
    <>
      <AppHeader />
      <main className={styles.mainContent}>
        <Outlet />
      </main>
    </>
  );
};
