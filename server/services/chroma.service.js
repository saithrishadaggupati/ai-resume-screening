const { ChromaClient } = require("chromadb");

const client = new ChromaClient({
  path: "http://localhost:8001",
});

let collection;

async function getCollection() {
  if (!collection) {
    collection = await client.getOrCreateCollection({
      name: "resumes",
    });
  }

  return collection;
}

module.exports = { getCollection };
