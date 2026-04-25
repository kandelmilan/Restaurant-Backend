const heroModel = require("../models/heroModel");

const getHero = (req, res) => {
    const language = req.query.lang || "en";

    heroModel.getHeroByLanguage(language, (err, results) => {
        if (err) {
            console.error("Error fetching hero:", err);
            return res.status(500).json({ error: err.message });
        }
        res.json(results || []);
    });
};

const getAllHeroes = (req, res) => {
    heroModel.getAllHeroes((err, results) => {
        if (err) {
            console.error("Error fetching heroes:", err);
            return res.status(500).json({ error: err.message });
        }
        res.json(results || []);
    });
};

const createHero = (req, res) => {
    console.log("CreateHero called");
    console.log("req.body:", req.body);
    console.log("req.file:", req.file);

    const { enTagline, enTitle, enHighlight, enDescription, jaTagline, jaTitle, jaHighlight, jaDescription } = req.body;

    // Validation
    if (!enTitle) {
        console.error("English title is missing");
        return res.status(400).json({ error: "English title is required" });
    }

    if (!jaTitle) {
        console.error("Japanese title is missing");
        return res.status(400).json({ error: "Japanese title is required" });
    }

    if (!req.file) {
        console.error("Image file is missing");
        return res.status(400).json({ error: "Image is required" });
    }

    const imageUrl = req.file.path;
    console.log("Image URL:", imageUrl);

    // Create hero in main table
    heroModel.createHero(
        {
            tagline: enTagline || "",
            title: enTitle,
            highlight: enHighlight || "",
            description: enDescription || "",
            image: imageUrl
        },
        (err, result) => {
            if (err) {
                console.error("DB Error creating hero:", err);
                return res.status(500).json({ error: "Database error: " + err.message });
            }

            const heroId = result.insertId;
            console.log("Hero created with ID:", heroId);

            // Track if both translations are done
            let translationsDone = 0;
            const checkComplete = () => {
                translationsDone++;
                if (translationsDone === 2) {
                    console.log("All translations added");
                    res.status(201).json({
                        success: true,
                        message: "Hero created successfully",
                        id: heroId
                    });
                }
            };

            // Add English translation
            heroModel.addHeroTranslation(heroId, "en", {
                tagline: enTagline || "",
                title: enTitle,
                highlight: enHighlight || "",
                description: enDescription || ""
            }, (transErr) => {
                if (transErr) console.error("Error adding EN translation:", transErr);
                checkComplete();
            });

            // Add Japanese translation
            heroModel.addHeroTranslation(heroId, "ja", {
                tagline: jaTagline || "",
                title: jaTitle,
                highlight: jaHighlight || "",
                description: jaDescription || ""
            }, (transErr) => {
                if (transErr) console.error("Error adding JA translation:", transErr);
                checkComplete();
            });
        }
    );
};

const updateHero = (req, res) => {
    const { id } = req.params;
    console.log("UpdateHero called for ID:", id);
    console.log("req.body:", req.body);
    console.log("req.file:", req.file);

    const { enTagline, enTitle, enHighlight, enDescription, jaTagline, jaTitle, jaHighlight, jaDescription, existingImage } = req.body;

    // Validation
    if (!enTitle) {
        return res.status(400).json({ error: "English title is required" });
    }

    if (!jaTitle) {
        return res.status(400).json({ error: "Japanese title is required" });
    }

    const imageUrl = req.file ? req.file.path : existingImage;

    if (!imageUrl) {
        return res.status(400).json({ error: "Image is required" });
    }

    console.log("Image URL:", imageUrl);

    // Update main hero table
    heroModel.updateHero(id, {
        tagline: enTagline || "",
        title: enTitle,
        highlight: enHighlight || "",
        description: enDescription || "",
        image: imageUrl
    }, (err) => {
        if (err) {
            console.error("DB Error updating hero:", err);
            return res.status(500).json({ error: "Database error: " + err.message });
        }

        // Track if both translations are done
        let translationsDone = 0;
        const checkComplete = () => {
            translationsDone++;
            if (translationsDone === 2) {
                console.log("All translations updated");
                res.json({
                    success: true,
                    message: "Hero updated successfully"
                });
            }
        };

        // Update English translation
        heroModel.addHeroTranslation(id, "en", {
            tagline: enTagline || "",
            title: enTitle,
            highlight: enHighlight || "",
            description: enDescription || ""
        }, (transErr) => {
            if (transErr) console.error("Error updating EN translation:", transErr);
            checkComplete();
        });

        // Update Japanese translation
        heroModel.addHeroTranslation(id, "ja", {
            tagline: jaTagline || "",
            title: jaTitle,
            highlight: jaHighlight || "",
            description: jaDescription || ""
        }, (transErr) => {
            if (transErr) console.error("Error updating JA translation:", transErr);
            checkComplete();
        });
    });
};

const deleteHero = (req, res) => {
    const { id } = req.params;
    console.log("DeleteHero called for ID:", id);

    heroModel.deleteHero(id, (err) => {
        if (err) {
            console.error("Error deleting hero:", err);
            return res.status(500).json({ error: err.message });
        }
        console.log("Hero deleted successfully");
        res.json({ message: "Hero deleted successfully" });
    });
};



module.exports = {
    getHero,
    getAllHeroes,
    createHero,
    updateHero,
    deleteHero
};