import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { motion } from "framer-motion";

export const WelcomePage: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: "100vh",
        padding: "20px",
      }}
    >
      <Box sx={{ flex: 1, textAlign: "center" }}>
        <Typography variant="h1">
          Добро пожаловать в Базу данных отдела кадров
        </Typography>
        <Typography variant="body1">
          Эта система поможет вам управлять данными сотрудников эффективно и
          удобно.
        </Typography>
        <Button variant="contained" color="primary">
          Войти
        </Button>
      </Box>
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          flex: 1,
          background: "lightblue",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h6" sx={{ marginTop: "20px" }}>
            Управляйте данными сотрудников с легкостью и эффективностью.
          </Typography>
        </Box>
      </motion.div>
    </Box>
  );
};
