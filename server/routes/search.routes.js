const express = require("express");
const router = express.Router();

const { createEmbedding } = require("../services/vector.service");
const { getCollection } = require("../services/chroma.service");
const Resume = require("../models/Resume");

router.get("/", async (req, res) => {
    try {
        const q = req.query.q;

        if (!q) {
            return res.status(400).json({
                success: false,
                message: "Query required"
            });
        }

        const embedding = await createEmbedding(q);

        const collection = await getCollection();

        const results = await collection.query({
            queryEmbeddings: [embedding],
            nResults: 10,
            include: ["metadatas", "distances"]
        });

        const ids = results.metadatas[0].map(x => x.resumeId);

        const resumes = await Resume.find({
            _id: { $in: ids }
        }).populate("job", "title");

        const ranked = ids.map(id => resumes.find(r => r._id.toString() === id));

        res.json({
            success: true,
            count: ranked.length,
            results: ranked,
            distances: results.distances[0]
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
});

module.exports = router;
