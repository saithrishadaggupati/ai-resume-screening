import {
  Container,
  Typography,
  Card,
  CardContent,
  Chip,
  Stack,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

import { useEffect, useState } from "react";
import api from "../services/api";

export default function Resumes() {
  const [resumes, setResumes] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    loadResumes();
  }, []);

  async function loadResumes() {
    try {
      const res = await api.get("/resumes");
      setResumes(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        All Candidates
      </Typography>

      {resumes.map((r) => (
        <Card
          key={r._id}
          sx={{
            mb: 3,
            cursor: "pointer",
            borderRadius: 4,
            border: "1px solid #E5E7EB",
            boxShadow: "0 8px 24px rgba(15,23,42,.08)",
            transition: ".25s",
            "&:hover": {
              transform: "translateY(-4px)",
            },
          }}
          onClick={() => setSelected(r)}
        >
          <CardContent>
            <Typography variant="h5" fontWeight={700}>
              {r.name}
            </Typography>

            <Typography color="text.secondary">
              {r.email}
            </Typography>

            <Typography sx={{ mt: 2 }}>
              Compatibility Score: {r.compatibilityScore}%
            </Typography>

            <LinearProgress
              variant="determinate"
              value={r.compatibilityScore || 0}
              sx={{
                mt: 1,
                mb: 2,
                height: 10,
                borderRadius: 10,
              }}
            />

            <Stack direction="row" spacing={1} flexWrap="wrap">
              {(r.skills || []).map((skill) => (
                <Chip
                  key={skill}
                  label={skill}
                  color="primary"
                  variant="outlined"
                />
              ))}
            </Stack>
          </CardContent>
        </Card>
      ))}

      <Dialog
        open={Boolean(selected)}
        onClose={() => setSelected(null)}
        maxWidth="md"
        fullWidth
      >
        {selected && (
          <>
            <DialogTitle>
              {selected.name}
            </DialogTitle>

            <DialogContent dividers>

              <Typography><b>Email:</b> {selected.email || "-"}</Typography>
              <Typography><b>Phone:</b> {selected.phone || "-"}</Typography>
              <Typography><b>Compatibility:</b> {selected.compatibilityScore}%</Typography>

              <Divider sx={{ my: 3 }} />

              <Typography variant="h6">Skills</Typography>

              <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 3 }}>
                {(selected.skills || []).map((s) => (
                  <Chip key={s} label={s} />
                ))}
              </Stack>

              <Typography variant="h6">Matched Skills</Typography>

              <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 3 }}>
                {(selected.matchedSkills || []).map((s) => (
                  <Chip key={s} label={s} color="success" />
                ))}
              </Stack>

              <Typography variant="h6">Missing Skills</Typography>

              <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 3 }}>
                {(selected.missingSkills || []).map((s) => (
                  <Chip key={s} label={s} color="error" />
                ))}
              </Stack>

              <Divider sx={{ my: 3 }} />

              <Typography variant="h6">Strengths</Typography>

              <List dense>
                {(selected.strengths || []).map((x, i) => (
                  <ListItem key={i}>
                    <ListItemText primary={x} />
                  </ListItem>
                ))}
              </List>

              <Typography variant="h6">Weaknesses</Typography>

              <List dense>
                {(selected.weaknesses || []).map((x, i) => (
                  <ListItem key={i}>
                    <ListItemText primary={x} />
                  </ListItem>
                ))}
              </List>

              <Typography variant="h6">Interview Questions</Typography>

              <List dense>
                {(selected.interviewQuestions || []).map((x, i) => (
                  <ListItem key={i}>
                    <ListItemText primary={x} />
                  </ListItem>
                ))}
              </List>

            </DialogContent>

            <DialogActions>
              <Button
                variant="contained"
                onClick={() => setSelected(null)}
              >
                Close
              </Button>
            </DialogActions>

          </>
        )}
      </Dialog>
    </Container>
  );
}
