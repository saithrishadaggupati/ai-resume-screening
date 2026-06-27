import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Avatar
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const navItems = [
    { label: "Dashboard", path: "/" },
    { label: "Jobs", path: "/jobs" },
    { label: "Resumes", path: "/resumes" },
    { label: "Upload", path: "/upload" },
    { label: "Search", path: "/search" },
  ];

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor:"#ffffffCC",
backdropFilter:"blur(14px)",
        borderBottom:"1px solid #E5E7EB",
boxShadow:"0 8px 30px rgba(15,23,42,.06)",
        color: "#111827",
      }}
    >
      <Toolbar sx={{ py:1.2 }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 800,
            color: "#2563eb",
            mr:6,
          }}
        >
          AI Resume Screening
        </Typography>

        <Box sx={{ flexGrow: 1 }}>
          {navItems.map((item) => (
            <Button
              key={item.path}
              component={Link}
              to={item.path}
              sx={{
                mx: 1,
                px:2.5,
                py:1.2,
                borderRadius:"12px",
                textTransform: "none",
                fontWeight: 700,
                color:
                  location.pathname === item.path
                    ? "#ffffff"
                    : "#374151",
                bgcolor:
                  location.pathname === item.path
                    ? "#2563eb"
                    : "transparent",
                "&:hover": {
                  bgcolor:
                    location.pathname === item.path
                      ? "#1d4ed8"
                      : "#eff6ff",
                },
              }}
            >
              {item.label}
            </Button>
          ))}
        </Box>

        <Avatar
          sx={{
            bgcolor: "#2563eb",
            width:44,
            height:44,
            fontWeight: 700,
          }}
        >
          A
        </Avatar>
      </Toolbar>
    </AppBar>
  );
}
