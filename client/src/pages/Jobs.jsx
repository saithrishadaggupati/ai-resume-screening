import {
  Container,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Stack,
  IconButton,
  Snackbar,
  Alert
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import api from "../services/api";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [skills, setSkills] = useState("");

  const [snack, setSnack] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    loadJobs();
  }, []);

  async function loadJobs() {
    try {
      const res = await api.get("/jobs");
      setJobs(res.data.jobs || []);
    } catch (err) {
      console.error(err);
    }
  }

  async function createJob() {
    try {
      await api.post("/jobs", {
        title,
        description,
        skills: skills
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
      });

      setSnack({
        open: true,
        message: "Job created successfully!",
        severity: "success",
      });

      setTitle("");
      setDescription("");
      setSkills("");

      loadJobs();
    } catch (err) {
      setSnack({
        open: true,
        message: err.message,
        severity: "error",
      });
    }
  }

  async function deleteJob(id) {
    await api.delete(`/jobs/${id}`);
    loadJobs();
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Job Management
      </Typography>

      <Stack spacing={2} sx={{ mb: 4 }}>
        <TextField
          label="Job Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <TextField
          label="Job Description"
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <TextField
          label="Skills (comma separated)"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
        />

        <Button
          variant="contained"
          onClick={createJob}
        >
          Create Job
        </Button>
      </Stack>

      {jobs.map((job) => (
        <Card key={job._id} sx={{ mb: 2 }}>
          <CardContent>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <div>
                <Typography variant="h6">
                  {job.title}
                </Typography>

                <Typography color="text.secondary">
                  {job.description}
                </Typography>

                <Typography sx={{ mt: 1 }}>
                  Skills:
                  {" "}
                  {(job.skills || []).join(", ")}
                </Typography>
              </div>

              <IconButton
                color="error"
                onClick={() => deleteJob(job._id)}
              >
                <DeleteIcon />
              </IconButton>
            </Stack>
          </CardContent>
        </Card>
      ))}

      <Snackbar
        open={snack.open}
        autoHideDuration={3000}
        onClose={() =>
          setSnack({
            ...snack,
            open: false,
          })
        }
      >
        <Alert
          severity={snack.severity}
          variant="filled"
        >
          {snack.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}
