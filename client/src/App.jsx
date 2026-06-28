import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Jobs from "./pages/Jobs";
import UploadResume from "./pages/UploadResume";
import SearchResume from "./pages/SearchResume";
import Resumes from "./pages/Resumes";
import Login from "./pages/Login";
import Register from "./pages/Register";

function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/*" element={
        <PrivateRoute>
          <>
            <Navbar />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/upload" element={<UploadResume />} />
              <Route path="/search" element={<SearchResume />} />
              <Route path="/resumes" element={<Resumes />} />
            </Routes>
          </>
        </PrivateRoute>
      } />
    </Routes>
  );
}