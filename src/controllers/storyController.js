const storyModel = require("../models/storyModel");

// GET
const getStories = (req, res) => {
    storyModel.getAllStories((err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
};

// POST
const createStory = (req, res) => {
    storyModel.createStory(req.body, (err) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Story created" });
    });
};

// PUT
const updateStory = (req, res) => {
    const { id } = req.params;

    storyModel.updateStory(id, req.body, (err) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Story updated" });
    });
};

// DELETE
const deleteStory = (req, res) => {
    const { id } = req.params;

    storyModel.deleteStory(id, (err) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Story deleted" });
    });
};

module.exports = {
    getStories,
    createStory,
    updateStory,
    deleteStory,
};