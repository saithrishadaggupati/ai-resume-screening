import {
  Container,
  Typography,
  Button,
  Snackbar,
  Alert,
  CircularProgress,
  Paper,
} from "@mui/material";

import { useState } from "react";
import api from "../services/api";

export default function UploadResume() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dragging, setDragging] = useState(false);

  const [snack, setSnack] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  async function uploadResume() {
    if (!file) {
      setSnack({
        open: true,
        message: "Please select a PDF.",
        severity: "warning",
      });
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("resume", file);

      const jobId = "6a3eb89a306ff79373c2b1b5";

      await api.post(`/resumes/${jobId}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setSnack({
        open: true,
        message: "Resume uploaded successfully!",
        severity: "success",
      });

      setFile(null);
    } catch (err) {
      setSnack({
        open: true,
        message:
          err.response?.data?.message ||
          err.message ||
          "Upload failed",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container sx={{ mt: 4, maxWidth: 700 }}>
      <Typography variant="h4" gutterBottom align="center">
        Upload Resume
      </Typography>

      <Paper
        elevation={dragging ? 8 : 2}
        sx={{
          mt: 3,
          mb: 3,
          p: 5,
          textAlign: "center",
          border: dragging
            ? "3px dashed #1976d2"
            : "2px dashed #cccccc",
          backgroundColor: dragging ? "#EFF6FF" : "#FFFFFF",
borderRadius: "20px",
minHeight: "260px",
          transition: "0.3s",
          cursor: "pointer",
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);

          if (e.dataTransfer.files.length > 0) {
            setFile(e.dataTransfer.files[0]);
          }
        }}
      >
        <Typography variant="h6">
          ?? Drag & Drop Your Resume Here
        </Typography>

        <Typography color="text.secondary" sx={{ mt: 1, mb: 3 }}>
          or browse from your computer
        </Typography>

        <Button variant="outlined" component="label">
          Browse PDF
          <input
            hidden
            type="file"
            accept=".pdf"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </Button>
      </Paper>

      <Typography sx={{ mb: 3 }} align="center">
        {file ? file.name : "No file selected"}
      </Typography>

      <Button
        fullWidth
        variant="contained"
        disabled={loading}
        onClick={uploadResume}
      >
        {loading ? (
          <>
            <CircularProgress
              size={20}
              color="inherit"
              sx={{ mr: 1 }}
            />
            Uploading...
          </>
        ) : (
          "Upload Resume"
        )}
      </Button>

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
        <Alert severity={snack.severity} variant="filled">
          {snack.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}
