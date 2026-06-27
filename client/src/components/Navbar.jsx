import { AppBar, Toolbar, Typography, Button, Box, Avatar } from "@mui/material";
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
    <AppBar position="sticky" elevation={0}>
      <Toolbar sx={{ py: 1.5, px: { xs: 2, md: 5 } }}>
        <Typography
          variant="h6"
          sx={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            fontSize: "1.3rem",
            color: "#1a1a1a",
            mr: 6,
            letterSpacing: "-0.5px",
          }}
        >
          RecruitAI
        </Typography>

        <Box sx={{ flexGrow: 1 }}>
          {navItems.map((item) => (
            <Button
              key={item.path}
              component={Link}
              to={item.path}
              sx={{
                mx: 0.5,
                px: 2,
                py: 1,
                borderRadius: "10px",
                textTransform: "none",
                fontWeight: 600,
                fontSize: "0.875rem",
                color: location.pathname === item.path ? "#f5f0e8" : "#555",
                bgcolor: location.pathname === item.path ? "#1a1a1a" : "transparent",
                "&:hover": {
                  bgcolor: location.pathname === item.path ? "#333" : "#ede8df",
                },
              }}
            >
              {item.label}
            </Button>
          ))}
        </Box>

        <Avatar
          sx={{
            bgcolor: "#1a1a1a",
            color: "#f5f0e8",
            width: 40,
            height: 40,
            fontWeight: 700,
            fontSize: "0.9rem",
          }}
        >
          R
        </Avatar>
      </Toolbar>
    </AppBar>
  );
}