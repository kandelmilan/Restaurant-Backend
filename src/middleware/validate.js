const validate = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
        console.error("Validation Error:", error.details[0].message);

        return res.status(400).json({
            error: error.details[0].message,
        });
    }

    next();
};

module.exports = validate;  