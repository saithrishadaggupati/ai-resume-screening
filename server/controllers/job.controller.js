const Job = require("../models/Job");

exports.createJob = async (req, res) => {
  try {
    const job = await Job.create(req.body);
    res.status(201).json({ success: true, job });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getJobs = async (req, res) => {
  const jobs = await Job.find().sort({ createdAt: -1 });
  res.json({ success: true, jobs });
};

exports.getJob = async (req, res) => {
  const job = await Job.findById(req.params.id);
  res.json({ success: true, job });
};

exports.updateJob = async (req, res) => {
  const job = await Job.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json({ success: true, job });
};

exports.deleteJob = async (req, res) => {
  await Job.findByIdAndDelete(req.params.id);
  res.json({ success: true });
};
