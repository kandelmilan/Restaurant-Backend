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
const createHero = (req, res) => {
    try {
        const imageUrl = req.file ? req.file.path : "";

        const heroData = {
            tagline: req.body.tagline || "",
            title: req.body.title || "",
            highlight: req.body.highlight || "",
            description: req.body.description || "",
            image: imageUrl
        };

        heroModel.createHero(heroData, (err, result) => {
            if (err) {
                console.log("DB ERROR:", err);
                return res.status(500).json(err);
            }

            res.status(201).json({
                message: "Hero created",
                hero: heroData
            });
        });
        console.log("FILE:", req.file);
        console.log("BODY:", req.body);

    } catch (err) {
        console.log("SERVER ERROR:", err);
        res.status(500).json({ error: err.message });
    }
};

// PUT update a hero
const updateHero = (req, res) => {
    const { id } = req.params;

    const imageUrl = req.file ? req.file.path : req.body.image;

    const heroData = {
        ...req.body,
        image: imageUrl
    };

    heroModel.updateHero(id, heroData, (err) => {
        if (err) return res.status(500).json(err);

        console.log(`API Hit: PUT /heroes/${id}`);

        res.json({
            message: "Hero updated",
            hero: heroData
        });
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