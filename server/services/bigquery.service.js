const { BigQuery } = require("@google-cloud/bigquery");

let bigquery;

if (process.env.GCS_KEY_JSON) {
  const credentials = JSON.parse(process.env.GCS_KEY_JSON);
  bigquery = new BigQuery({ credentials, projectId: "tidy-etching-499107-r0" });
} else {
  bigquery = new BigQuery({ keyFilename: "../gcs-key.json", projectId: "tidy-etching-499107-r0" });
}

const dataset = bigquery.dataset("recruit_ai");
const table = dataset.table("resume_analytics");

async function logResumeToBigQuery(resume, jobTitle) {
  try {
    const row = {
      resume_id: resume._id.toString(),
      candidate_name: resume.name || "Unknown",
      job_title: jobTitle || "Unknown",
      compatibility_score: resume.compatibilityScore || 0,
      matched_skills: (resume.matchedSkills || []).join(", "),
      missing_skills: (resume.missingSkills || []).join(", "),
      uploaded_at: new Date().toISOString(),
    };
    await table.insert([row]);
    console.log("BigQuery: resume logged successfully");
  } catch (err) {
    console.log("BigQuery logging skipped:", err.message);
  }
}

module.exports = { logResumeToBigQuery };