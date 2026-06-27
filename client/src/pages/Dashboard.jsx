import {
Divider,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Stack,
  LinearProgress,
  Button,
  Chip,
  Box
} from "@mui/material";

import DescriptionIcon from "@mui/icons-material/Description";
import SearchIcon from "@mui/icons-material/Search";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import PeopleIcon from "@mui/icons-material/People";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import WorkIcon from "@mui/icons-material/Work";
import PsychologyIcon from "@mui/icons-material/Psychology";

import {
useEffect, useState } from "react";
import {
Link } from "react-router-dom";
import api from "../services/api";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    totalResumes: 0,
    searches: 0,
    averageScore: 0,
    candidates: 0,
  });

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      const res = await api.get("/dashboard/stats");
      setStats(res.data);
    } finally {
      setLoading(false);
    }
  }

  const cards = [
    {
      title: "Candidates",
      value: stats.candidates,
      color: "#2563eb",
      icon: <PeopleIcon fontSize="large" />
    },
    {
      title: "Resumes",
      value: stats.totalResumes,
      color: "#10b981",
      icon: <DescriptionIcon fontSize="large" />
    },
    {
      title: "Average Match",
      value: `${stats.averageScore}%`,
      color: "#f59e0b",
      icon: <TrendingUpIcon fontSize="large" />
    },
    {
      title: "AI Searches",
      value: stats.searches,
      color: "#7c3aed",
      icon: <SearchIcon fontSize="large" />
    }
  ];

  if (loading) {
    return (
      <Container sx={{ py: 10, textAlign: "center" }}>
        <CircularProgress size={50} />
      </Container>
    );
  }

  return (
    <Container maxWidth={false} sx={{px:{xs:2,md:5},py:5}}>

      <Typography variant="h3" fontWeight={800}>
        Recruiter Dashboard
      </Typography>

      <Typography color="text.secondary" sx={{ mb: 5 }}>
        AI Resume Screening Platform
      </Typography>

      <Grid container spacing={4}>

        {cards.map((c) => (
          <Grid size={{xs:12,sm:6,lg:3}} key={c.title}>
            <Card sx={{ borderRadius:5,boxShadow:"0 10px 30px rgba(15,23,42,.08)" }}>
              <CardContent>

                <Stack direction="row" justifyContent="space-between">

                  <Box>
                    <Typography color="text.secondary">
                      {c.title}
                    </Typography>

                    <Typography
                      variant="h3"
                      fontWeight={800}
                    >
                      {c.value}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      width: 64,
                      height: 64,
                      borderRadius: 3,
                      bgcolor: c.color,
                      color: "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    {c.icon}
                  </Box>

                </Stack>

              </CardContent>
            </Card>
          </Grid>
        ))}

        <Grid size={{xs:12,lg:8}}>
          <Card sx={{ borderRadius:5,boxShadow:"0 10px 30px rgba(15,23,42,.08)" }}>
            <CardContent>

              <Typography variant="h5" fontWeight={700}>
                Hiring Insights
              </Typography>

              <Typography sx={{ mt: 3 }}>
                Average Match Score
              </Typography>

              <LinearProgress
                variant="determinate"
                value={stats.averageScore}
                sx={{
                  height: 12,
                  borderRadius: 10,
                  mt: 1
                }}
              />

              <Stack
                direction="row"
                spacing={1}
                sx={{ mt: 4 }}
              >
                <Chip label="Python" color="primary" />
                <Chip label="React" color="success" />
                <Chip label="SQL" color="warning" />
                <Chip label="MongoDB" color="secondary" />
              </Stack>

            </CardContent>
          </Card>
        </Grid>

        <Grid size={{xs:12,lg:4}}>
          <Card sx={{ borderRadius:5,boxShadow:"0 10px 30px rgba(15,23,42,.08)" }}>
            <CardContent>

              <Typography
                variant="h5"
                fontWeight={700}
                gutterBottom
              >
                Quick Actions
              </Typography>

              <Stack spacing={2}>

                <Button
                  fullWidth
                  variant="contained"
                  component={Link}
                  to="/upload"
                  startIcon={<UploadFileIcon />}
                >
                  Upload Resume
                </Button>

                <Button
                  fullWidth
                  variant="outlined"
                  component={Link}
                  to="/jobs"
                  startIcon={<WorkIcon />}
                >
                  Manage Jobs
                </Button>

                <Button
                  fullWidth
                  variant="outlined"
                  component={Link}
                  to="/search"
                  startIcon={<PsychologyIcon />}
                >
                  AI Search
                </Button>

              </Stack>

            </CardContent>
          </Card>
        </Grid>

      </Grid>

    </Container>
  );
}
