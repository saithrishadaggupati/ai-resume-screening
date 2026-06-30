import axios from "axios";

const api = axios.create({
  baseURL: "https://ai-resume-screening-721141274431.us-central1.run.app/api",
});

export default api;
