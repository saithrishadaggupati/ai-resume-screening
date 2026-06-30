async function indexResume(resume, data) {
  try {
    const { createEmbedding } = require("../services/vector.service");
    const { getCollection } = require("../services/chroma.service");
    const text = `Name: ${data.name || ""} Skills: ${(data.skills || []).join(", ")}`;
    const embedding = await createEmbedding(text);
    const collection = await getCollection();
    await collection.add({
      ids: [resume._id.toString()],
      embeddings: [embedding],
      documents: [text],
      metadatas: [{ resumeId: resume._id.toString(), name: data.name || "", score: data.compatibilityScore || 0 }]
    });
  } catch (err) {
    console.log("ChromaDB indexing skipped:", err.message);
  }
}
module.exports = { indexResume };