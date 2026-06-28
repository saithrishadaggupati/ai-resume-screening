import { Container, Card, CardContent, Typography, TextField, Button, Stack, Alert } from "@mui/material";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleLogin() {
    try {
      setLoading(true);
      setError("");
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Card>
        <CardContent sx={{ p: 5 }}>
          <Typography variant="h4" fontWeight={800} gutterBottom align="center">
            RecruitAI
          </Typography>
          <Typography color="text.secondary" align="center" sx={{ mb: 4 }}>
            Sign in to your account
          </Typography>
          {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
          <Stack spacing={3}>
            <TextField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth />
            <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} fullWidth />
            <Button variant="contained" fullWidth disabled={loading} onClick={handleLogin}>
              {loading ? "Signing in..." : "Sign In"}
            </Button>
            <Typography align="center" color="text.secondary">
              Don't have an account?{" "}
              <Link to="/register" style={{ color: "#1a1a1a", fontWeight: 700 }}>Register</Link>
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
}