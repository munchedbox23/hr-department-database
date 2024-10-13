import React, { useState } from "react";
import { Box, Tabs, Tab, Typography, Paper } from "@mui/material";
import { LoginForm } from "@/features/authentication/login";

interface AuthFormProps {
  title: string;
  initialTab: number;
}

export const AuthForm: React.FC<AuthFormProps> = ({ title, initialTab }) => {
  const [tabValue, setTabValue] = useState(initialTab);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Paper
      elevation={3}
      sx={{
        width: "100%",
        maxWidth: 700,
        minWidth: { md: "550px", xs: "220px" },
        margin: "auto",
        padding: 2,
        backgroundColor: "rgba(0, 0, 0, 0.03)",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        align="center"
        sx={{ fontWeight: "bold", fontSize: "20px", marginBottom: "15px" }}
      >
        {title}
      </Typography>
      <Tabs value={tabValue} onChange={handleTabChange} centered>
        <Tab label="Вход" />
        <Tab label="Регистрация" />
      </Tabs>
      <Box sx={{ padding: 2, display: "flex", justifyContent: "center" }}>
        {tabValue === 0 && <LoginForm />}
        {tabValue === 1 && <div>Регистрация</div>}
      </Box>
    </Paper>
  );
};
