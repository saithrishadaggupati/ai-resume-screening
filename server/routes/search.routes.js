const express = require("express");
const router = express.Router();
const Resume = require("../models/Resume");

router.get("/", async (req, res) => {
  try {
    const q = req.query.q;
    if (!q) return res.status(400).json({ success: false, message: "Query required" });

    const resumes = await Resume.find({
      $or: [
        { name: { $regex: q, $options: "i" } },
        { skills: { $elemMatch: { $regex: q, $options: "i" } } },
        { summary: { $regex: q, $options: "i" } },
        { experience: { $regex: q, $options: "i" } },
      ]
    }).populate("job", "title").sort({ compatibilityScore: -1 }).limit(10);

    res.json({ success: true, count: resumes.length, results: resumes });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;