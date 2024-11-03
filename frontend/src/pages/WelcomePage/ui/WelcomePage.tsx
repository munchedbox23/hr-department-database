import React from "react";
import { Box, Button, Typography, Paper } from "@mui/material";
import { motion } from "framer-motion";
import dataBaseImage from "@/shared/assets/images/dataBase.jpeg";

export const WelcomePage: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        justifyContent: "space-between",
        alignItems: "center",
        height: "100%",
        padding: { xs: "10px", sm: "20px" },
      }}
    >
      <Box sx={{ flex: 1, padding: { xs: "10px", sm: "20px" } }}>
        <Paper
          elevation={3}
          sx={{
            padding: { xs: "20px", sm: "40px" },
            borderRadius: "10px",
            background: "#ffffff",
            textAlign: "center",
            maxWidth: { xs: "100%", md: "500px" },
            width: "100%",
            marginRight: { md: "20px" },
            marginBottom: { xs: "20px", md: 0 },
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: 600,
                marginBottom: "20px",
                color: "#1976D2",
                fontSize: { xs: "1.8rem", sm: "2rem", md: "2.5rem" },
              }}
            >
              Добро пожаловать в Базу данных отдела кадров
            </Typography>
            <Typography
              variant="body1"
              sx={{ marginBottom: "20px", color: "#616161" }}
            >
              Эта система поможет вам управлять данными сотрудников эффективно и
              удобно.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{ marginTop: "20px" }}
            >
              Начать работу
            </Button>
          </motion.div>
        </Paper>
      </Box>
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <picture>
          <source srcSet={dataBaseImage} type="image/jpeg" />
          <img
            src={dataBaseImage}
            alt="HR Database Visualization"
            style={{
              maxWidth: "100%",
              maxHeight: "50%",
              borderRadius: "10px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            }}
          />
        </picture>
      </motion.div>
    </Box>
  );
};
