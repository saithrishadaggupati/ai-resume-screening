import {
  Container,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Chip,
  Stack,
  LinearProgress,
  Divider,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import PsychologyIcon from "@mui/icons-material/Psychology";

import { useState } from "react";
import api from "../services/api";

export default function SearchResume() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  async function search() {
    if (!query.trim()) return;

    try {
      setLoading(true);

      const res = await api.get(
        `/search?q=${encodeURIComponent(query)}`
      );

      setResults(res.data.results || []);
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Semantic Resume Search
      </Typography>

      <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
        <TextField sx={{"& .MuiOutlinedInput-root":{borderRadius:"14px"}}}
          fullWidth
          label="Search resumes..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <Button sx={{borderRadius:"14px",px:4}}
          variant="contained"
          disabled={loading}
          onClick={search}
          startIcon={
            loading ? (
              <CircularProgress size={18} color="inherit" />
            ) : (
              <SearchIcon />
            )
          }
        >
          {loading ? "Searching..." : "Search"}
        </Button>
      </Stack>

      {!loading && results.length === 0 && query !== "" && (
        <Typography
          align="center"
          color="text.secondary"
          sx={{ mb: 3 }}
        >
          No matching resumes found.
        </Typography>
      )}

      {results.map((r) => (
        <Card key={r._id} sx={{ mb:4,borderRadius:4,border:"1px solid #E5E7EB",boxShadow:"0 8px 24px rgba(15,23,42,.08)" }}>
          <CardContent>
            <Typography variant="h5">
              {r.name || "Unknown Candidate"}
            </Typography>

            <Typography color="text.secondary" sx={{ mb: 1 }}>
              Compatibility Score: {r.compatibilityScore}%
            </Typography>

            <LinearProgress sx={{height:12,borderRadius:10,mb:3}}
              variant="determinate"
              value={r.compatibilityScore || 0}
              sx={{
                height: 10,
                borderRadius: 5,
                mb: 3,
              }}
            />

            <Typography>{r.summary}</Typography>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h6">Skills</Typography>

            <Stack
              direction="row"
              spacing={1}
              flexWrap="wrap"
              sx={{ mb: 3 }}
            >
              {(r.skills || []).map((skill) => (
                <Chip key={skill} label={skill} />
              ))}
            </Stack>

            <Typography
              variant="h6"
              color="success.main"
            >
              Matched Skills
            </Typography>

            <Stack
              direction="row"
              spacing={1}
              flexWrap="wrap"
              sx={{ mb: 3 }}
            >
              {(r.matchedSkills || []).map((skill) => (
                <Chip
                  key={skill}
                  color="success"
                  icon={<CheckCircleIcon />}
                  label={skill}
                />
              ))}
            </Stack>

            <Typography
              variant="h6"
              color="error.main"
            >
              Missing Skills
            </Typography>

            <Stack
              direction="row"
              spacing={1}
              flexWrap="wrap"
              sx={{ mb: 3 }}
            >
              {(r.missingSkills || []).map((skill) => (
                <Chip
                  key={skill}
                  color="error"
                  icon={<CancelIcon />}
                  label={skill}
                />
              ))}
            </Stack>

            <Divider sx={{ my: 3 }} />

            <Typography
              variant="h6"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <PsychologyIcon />
              AI Strengths
            </Typography>

            <List dense>
              {(r.strengths || []).map((item, index) => (
                <ListItem key={index}>
                  <ListItemText primary={item} />
                </ListItem>
              ))}
            </List>

            <Typography variant="h6">
              AI Weaknesses
            </Typography>

            <List dense>
              {(r.weaknesses || []).map((item, index) => (
                <ListItem key={index}>
                  <ListItemText primary={item} />
                </ListItem>
              ))}
            </List>

            <Typography variant="h6">
              Interview Questions
            </Typography>

            <List dense>
              {(r.interviewQuestions || []).map((item, index) => (
                <ListItem key={index}>
                  <ListItemText primary={item} />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
}
