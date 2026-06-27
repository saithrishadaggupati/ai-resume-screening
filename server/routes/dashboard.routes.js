const express = require("express");
const Resume = require("../models/Resume");

const router = express.Router();

router.get("/stats", async (req, res) => {
  try {
    const resumes = await Resume.find().sort({ createdAt: -1 });

    const totalResumes = resumes.length;

    const averageScore =
      totalResumes > 0
        ? Math.round(
            resumes.reduce(
              (sum, r) => sum + (r.compatibilityScore || 0),
              0
            ) / totalResumes
          )
        : 0;

    res.json({
      totalResumes,
      candidates: totalResumes,
      searches: 0,
      averageScore,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

module.exports = router;
