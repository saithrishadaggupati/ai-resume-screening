const express = require("express");
const router = express.Router();
const fs = require("fs");
const upload = require("../middleware/upload.middleware");
const Resume = require("../models/Resume");
const Job = require("../models/Job");
const { extractText } = require("../services/parser.service");
const { analyzeResume } = require("../services/ai.service");
const { compareSkills } = require("../services/matcher.service");
const { indexResume } = require("../services/indexer.service");
const { uploadToGCS } = require("../services/gcs.service");

router.post("/:jobId/upload", upload.single("resume"), async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId);
    if (!job) return res.status(404).json({ success: false, message: "Job not found" });
    const resumeText = await extractText(req.file.path);
    const fileBuffer = fs.readFileSync(req.file.path);
    const gcsUrl = await uploadToGCS(fileBuffer, req.file.originalname, req.file.mimetype);
    const jobDescription = `Title: ${job.title}\nSkills: ${job.skills.join(", ")}`;
    const aiResponse = await analyzeResume(resumeText, jobDescription);
    const clean = aiResponse.replace(/```json/g, "").replace(/```/g, "").trim();
    const data = JSON.parse(clean);
    const match = compareSkills(job.skills, data.skills || []);
    const resume = await Resume.create({
      job: job._id, filename: req.file.filename, originalName: req.file.originalname,
      path: req.file.path, gcsUrl, name: data.name, email: data.email, phone: data.phone,
      skills: data.skills || [], experience: data.experience || "", education: data.education || [],
      summary: data.summary || "", compatibilityScore: data.compatibilityScore || 0,
      strengths: data.strengths || [], weaknesses: data.weaknesses || [],
      interviewQuestions: data.interviewQuestions || [], semanticMatch: match.percentage,
      matchedSkills: match.matched, missingSkills: match.missing, rawAI: data, status: "completed",
    });
    await indexResume(resume, data);
    res.json({ success: true, resume });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
});

router.get("/", async (req, res) => {
  const resumes = await Resume.find().populate("job", "title").sort({ compatibilityScore: -1 });
  res.json(resumes);
});

module.exports = router;
