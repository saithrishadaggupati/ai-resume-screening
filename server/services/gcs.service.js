const { Storage } = require("@google-cloud/storage");
const path = require("path");

let storage;

if (process.env.GCS_KEY_JSON) {
  const credentials = JSON.parse(process.env.GCS_KEY_JSON);
  storage = new Storage({ credentials });
} else {
  storage = new Storage({
    keyFilename: path.join(__dirname, "../gcs-key.json"),
  });
}

const BUCKET_NAME = "ai-resume-screening-uploads";
const bucket = storage.bucket(BUCKET_NAME);

async function uploadToGCS(fileBuffer, originalName, mimetype) {
  const fileName = `resumes/${Date.now()}-${originalName}`;
  const file = bucket.file(fileName);

  await file.save(fileBuffer, {
    metadata: { contentType: mimetype },
  });

  return `https://storage.googleapis.com/${BUCKET_NAME}/${fileName}`;
}

module.exports = { uploadToGCS };