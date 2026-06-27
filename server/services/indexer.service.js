const { createEmbedding } = require("../services/vector.service");
const { getCollection } = require("../services/chroma.service");

async function indexResume(resume, data) {

    const text = `
Name: ${data.name || ""}
Summary: ${data.summary || ""}
Skills: ${(data.skills || []).join(", ")}
Experience: ${data.experience || ""}
Strengths: ${(data.strengths || []).join(", ")}
`;

    const embedding = await createEmbedding(text);

    const collection = await getCollection();

    await collection.add({
        ids: [resume._id.toString()],
        embeddings: [embedding],
        documents: [text],
        metadatas: [{
            resumeId: resume._id.toString(),
            name: data.name || "",
            score: data.compatibilityScore || 0
        }]
    });
}

module.exports = { indexResume };
