import axios from "axios";

const api = axios.create({
  baseURL: "https://ai-resume-screening-d5na.onrender.com/api",
});

export default api;