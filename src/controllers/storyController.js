const storyModel = require("../models/storyModel");

// GET
const getStories = (req, res) => {
    console.log("API Hit: GET /stories");

    storyModel.getAllStories((err, results) => {
        if (err) {
            console.error("GET Error:", err);
            return res.status(500).json(err);
        }

        console.log("Stories fetched:", results);
        res.json(results);
    });
};

// POST
const createStory = (req, res) => {
    console.log("API Hit: POST /stories");
    console.log("Data:", req.body);

    storyModel.createStory(req.body, (err, result) => {
        if (err) {
            console.error("POST Error:", err);
            return res.status(500).json(err);
        }

        console.log("Story created with ID:", result.insertId);
        console.log("Story created with ID:", result);

        res.json({
            message: "Story created",
            id: result.insertId,
        });
    });
};

// PUT
const updateStory = (req, res) => {
    const { id } = req.params;
    const { subtitle, title, content, highlight } = req.body;

    console.log(`API Hit: PUT /stories/${id}`);
    console.log("Update Data:", req.body);

    if (!title || !content) {
        return res.status(400).json({
            error: "Title and Content are required",
        });
    }

    storyModel.updateStory(id, { subtitle, title, content, highlight }, (err, result) => {
        if (err) {
            console.error("Update Error:", err);
            return res.status(500).json({
                error: "Failed to update story",
                details: err.message,
            });
        }

        if (result.affectedRows === 0) {
            console.warn("Story not found:", id);
            return res.status(404).json({
                error: "Story not found",
            });
        }

        console.log("Story updated:", id);

        res.json({
            message: "Story updated successfully",
        });
    });
};

// DELETE
const deleteStory = (req, res) => {
    const { id } = req.params;

    console.log(`API Hit: DELETE /stories/${id}`);

    storyModel.deleteStory(id, (err, result) => {
        if (err) {
            console.error("Delete Error:", err);
            return res.status(500).json({
                error: "Failed to delete story",
                details: err.message,
            });
        }

        if (result.affectedRows === 0) {
            console.warn("Story not found:", id);
            return res.status(404).json({
                error: "Story not found",
            });
        }

        console.log("Story deleted:", id);

        res.json({
            message: "Story deleted successfully",
        });
    });
};

module.exports = {
    getStories,
    createStory,
    updateStory,
    deleteStory,
};