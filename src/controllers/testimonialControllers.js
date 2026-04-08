const testimonialModel = require("../models/testimonialModel");

// GET
const getTestimonials = (req, res) => {
    console.log("API Hit: GET /testimonials");

    testimonialModel.getAllTestimonials((err, results) => {
        if (err) {
            console.error("GET Error:", err);
            return res.status(500).json(err);
        }

        console.log("Testimonials fetched:", results.length);
        res.json(results);
    });
};

// POST
const createTestimonial = (req, res) => {
    console.log("API Hit: POST /testimonials");
    console.log("Data:", req.body);

    const { author, rating, text } = req.body;

    // Validation
    if (!author || !text) {
        return res.status(400).json({
            error: "Author and Text are required",
        });
    }

    testimonialModel.createTestimonial({ author, rating, text }, (err, result) => {
        if (err) {
            console.error("POST Error:", err);
            return res.status(500).json(err);
        }

        console.log("✅ Testimonial created with ID:", result.insertId);

        res.json({
            message: "Testimonial created",
            id: result.insertId,
        });
    });
};

// PUT
const updateTestimonial = (req, res) => {
    const { id } = req.params;
    const { author, rating, text } = req.body;

    console.log(`API Hit: PUT /testimonials/${id}`);
    console.log("Update Data:", req.body);

    // Validation
    if (!author || !text) {
        return res.status(400).json({
            error: "Author and Text are required",
        });
    }

    testimonialModel.updateTestimonial(
        id,
        {
            author,
            rating,
            text,
        },
        (err, result) => {
            if (err) {
                console.error("Update Error:", err);
                return res.status(500).json({
                    error: "Failed to update testimonial",
                    details: err.message,
                });
            }

            if (result.affectedRows === 0) {
                console.warn("Testimonial not found:", id);
                return res.status(404).json({
                    error: "Testimonial not found",
                });
            }

            console.log("Testimonial updated:", id);

            res.json({
                message: "Testimonial updated successfully",
            });
        }
    );
};

// DELETE
const deleteTestimonial = (req, res) => {
    const { id } = req.params;

    console.log(`API Hit: DELETE /testimonials/${id}`);

    testimonialModel.deleteTestimonial(id, (err, result) => {
        if (err) {
            console.error("Delete Error:", err);
            return res.status(500).json({
                error: "Failed to delete testimonial",
                details: err.message,
            });
        }

        if (result.affectedRows === 0) {
            console.warn("Testimonial not found:", id);
            return res.status(404).json({
                error: "Testimonial not found",
            });
        }

        console.log("Testimonial deleted:", id);

        res.json({
            message: "Testimonial deleted successfully",
        });
    });
};

module.exports = {
    getTestimonials,
    createTestimonial,
    updateTestimonial,
    deleteTestimonial,
};