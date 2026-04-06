const heroModel = require("../models/heroModel");

// GET all heroes
const getHeroes = (req, res) => {
    heroModel.getAllHeroes((err, results) => {
        if (err) {
            console.error("Error fetching heroes:", err);
            return res.status(500).json(err);
        }
        console.log("API Hit: GET /heroes");
        console.log("Heroes fetched:", results);
        res.json(results);
    });
};

// POST create a hero
const createHero = (req, res) => {  // ✅ fixed order
    heroModel.createHero(req.body, (err, result) => {
        if (err) {
            console.error("Error creating hero:", err);
            return res.status(500).json(err);
        }
        console.log("API Hit: POST /heroes");
        console.log("Hero created:", req.body);
        res.status(201).json({ message: "Hero created", id: result.insertId, hero: req.body });
    });
};

// PUT update a hero
const updateHero = (req, res) => {
    const { id } = req.params;

    heroModel.updateHero(id, req.body, (err) => {
        if (err) return res.status(500).json(err);
        console.log(`API Hit: PUT /heroes/${id}`);
        res.json({ message: "Hero updated" });
    });
};

// DELETE a hero
const deleteHero = (req, res) => {
    const { id } = req.params;

    heroModel.deleteHero(id, (err) => {
        if (err) return res.status(500).json(err);
        console.log(`API Hit: DELETE /heroes/${id}`);
        res.json({ message: "Hero deleted" });
    });
};

module.exports = {
    getHeroes,
    createHero,
    updateHero,
    deleteHero
};