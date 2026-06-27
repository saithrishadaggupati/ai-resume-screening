import axios from "axios";

const api = axios.create({
  baseURL: "https://ai-resume-screening-api-52kz.onrender.com/api",
});

export default api;