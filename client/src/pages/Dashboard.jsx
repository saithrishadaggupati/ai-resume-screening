import {
  Container, Grid, Card, CardContent, Typography,
  CircularProgress, Stack, Button, Box, LinearProgress, Chip
} from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import SearchIcon from "@mui/icons-material/Search";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import PeopleIcon from "@mui/icons-material/People";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import WorkIcon from "@mui/icons-material/Work";
import PsychologyIcon from "@mui/icons-material/Psychology";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import api from "../services/api";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ totalResumes: 0, searches: 0, averageScore: 0, candidates: 0 });
  const [resumes, setResumes] = useState([]);
  const [jobs, setJobs] = useState([]);

  useEffect(() => { loadDashboard(); }, []);

  async function loadDashboard() {
    try {
      const [statsRes, resumesRes, jobsRes] = await Promise.all([
        api.get("/dashboard/stats"),
        api.get("/resumes"),
        api.get("/jobs"),
      ]);
      setStats(statsRes.data);
      setResumes(Array.isArray(resumesRes.data) ? resumesRes.data : []);
      setJobs(jobsRes.data.jobs || []);
    } finally {
      setLoading(false);
    }
  }

  const cards = [
    { title: "Candidates", value: stats.candidates, color: "#1a1a1a", icon: <PeopleIcon fontSize="large" /> },
    { title: "Resumes", value: stats.totalResumes, color: "#3d3d3d", icon: <DescriptionIcon fontSize="large" /> },
    { title: "Avg Match", value: `${stats.averageScore}%`, color: "#5a5a5a", icon: <TrendingUpIcon fontSize="large" /> },
    { title: "Jobs", value: jobs.length, color: "#7a7a7a", icon: <WorkIcon fontSize="large" /> },
  ];

  const chartData = resumes.slice(0, 8).map((r) => ({
    name: r.name?.split(" ")[0] || "Unknown",
    score: r.compatibilityScore || 0,
  }));

  if (loading) return <Container sx={{ py: 10, textAlign: "center" }}><CircularProgress size={50} /></Container>;

  return (
    <Container maxWidth={false} sx={{ px: { xs: 2, md: 5 }, py: 5 }}>
      <Typography variant="h3" fontWeight={800}>Recruiter Dashboard</Typography>
      <Typography color="text.secondary" sx={{ mb: 5 }}>AI Resume Screening Platform — Powered by Gemini + Google Cloud</Typography>

      <Grid container spacing={4}>
        {cards.map((c) => (
          <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={c.title}>
            <Card>
              <CardContent>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Box>
                    <Typography color="text.secondary">{c.title}</Typography>
                    <Typography variant="h3" fontWeight={800}>{c.value}</Typography>
                  </Box>
                  <Box sx={{ width: 56, height: 56, borderRadius: 3, bgcolor: c.color, color: "#f5f0e8", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {c.icon}
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}

        <Grid size={{ xs: 12, lg: 8 }}>
          <Card>
            <CardContent>
              <Typography variant="h5" fontWeight={700} gutterBottom>Candidate Compatibility Scores</Typography>
              {chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={chartData}>
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Bar dataKey="score" radius={[8, 8, 0, 0]}>
                      {chartData.map((_, i) => <Cell key={i} fill={i % 2 === 0 ? "#1a1a1a" : "#c8bfaf"} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <Typography color="text.secondary" sx={{ py: 5, textAlign: "center" }}>Upload resumes to see scores here</Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, lg: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h5" fontWeight={700} gutterBottom>Quick Actions</Typography>
              <Stack spacing={2}>
                <Button fullWidth variant="contained" component={Link} to="/upload" startIcon={<UploadFileIcon />}>Upload Resume</Button>
                <Button fullWidth variant="outlined" component={Link} to="/jobs" startIcon={<WorkIcon />}>Manage Jobs</Button>
                <Button fullWidth variant="outlined" component={Link} to="/search" startIcon={<PsychologyIcon />}>AI Search</Button>
                <Button fullWidth variant="outlined" component={Link} to="/resumes" startIcon={<DescriptionIcon />}>View Candidates</Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {resumes.length > 0 && (
          <Grid size={{ xs: 12 }}>
            <Card>
              <CardContent>
                <Typography variant="h5" fontWeight={700} gutterBottom>Top Candidates</Typography>
                <Stack spacing={2}>
                  {resumes.slice(0, 5).map((r) => (
                    <Box key={r._id}>
                      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 0.5 }}>
                        <Typography fontWeight={600}>{r.name || "Unknown"}</Typography>
                        <Typography fontWeight={700}>{r.compatibilityScore}%</Typography>
                      </Stack>
                      <LinearProgress variant="determinate" value={r.compatibilityScore || 0} sx={{ height: 8, borderRadius: 5 }} />
                      <Stack direction="row" spacing={1} sx={{ mt: 1 }} flexWrap="wrap">
                        {(r.skills || []).slice(0, 4).map((s) => <Chip key={s} label={s} size="small" />)}
                      </Stack>
                    </Box>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>
    </Container>
  );
}