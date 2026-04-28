const testimonialModel = require("../models/testimonialModel");

// GET 
const getTestimonials = (req, res) => {

    testimonialModel.getAllTestimonials((err, results) => {
        if (err) {
            console.error("GET Error:", err);
            return res.status(500).json({
                error: "Failed to fetch testimonials",
                details: err.message,
            });
        }

        res.json(results);
    });
};

//  POST 
const createTestimonial = (req, res) => {

    const { author, rating, text } = req.body;

    // Validation
    if (!author || !text) {
        console.warn("Validation Failed: Missing fields");
        return res.status(400).json({
            error: "Author and Text are required",
        });
    }

    testimonialModel.createTestimonial(
        { author, rating, text },
        (err, result) => {
            if (err) {
                console.error("POST Error:", err);
                return res.status(500).json({
                    error: "Failed to create testimonial",
                    details: err.message,
                });
            }

            console.log("Testimonial Created");
            console.log("Insert ID:", result.insertId);

            res.json({
                message: "Testimonial created successfully",
                id: result.insertId,
            });
        }
    );
};

//  PUT 
const updateTestimonial = (req, res) => {
    const { id } = req.params;

    // Validation
    const { author, rating, text } = req.body;
    if (!author || !text) {
        console.warn("Validation Failed");
        return res.status(400).json({
            error: "Author and Text are required",
        });
    }

    testimonialModel.updateTestimonial(
        id,
        { author, rating, text },
        (err, result) => {
            if (err) {
                console.error("UPDATE Error:", err);
                return res.status(500).json({
                    error: "Failed to update testimonial",
                    details: err.message,
                });
            }

            if (result.affectedRows === 0) {
                console.warn("No record found for ID:", id);
                return res.status(404).json({
                    error: "Testimonial not found",
                });
            }

            console.log("Testimonial Updated:", id);

            res.json({
                message: "Testimonial updated successfully",
            });
        }
    );
};

//  DELETE 
const deleteTestimonial = (req, res) => {
    const { id } = req.params;


    testimonialModel.deleteTestimonial(id, (err, result) => {
        if (err) {
            console.error("DELETE Error:", err);
            return res.status(500).json({
                error: "Failed to delete testimonial",
                details: err.message,
            });
        }

        if (result.affectedRows === 0) {
            console.warn("No record found for ID:", id);
            return res.status(404).json({
                error: "Testimonial not found",
            });
        }

        console.log("Testimonial Deleted:", id);

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