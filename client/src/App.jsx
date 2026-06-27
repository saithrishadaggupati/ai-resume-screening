import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import Jobs from "./pages/Jobs";
import UploadResume from "./pages/UploadResume";
import SearchResume from "./pages/SearchResume";
import Resumes from "./pages/Resumes";

export default function App() {
  return (
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
  );
}
