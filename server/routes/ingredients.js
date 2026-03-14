const express = require('express');
const router = express.Router();
const Ingredient = require('../Models/Ingredient');

router.get('/', async (req, res) => {
    try {
        const ingredients = await Ingredient.find().select('-_id -__v'); // Exclude mongo-specific fields from response
        res.status(200).json({ success: true, ingredients });
    } catch (error) {
        console.error("Error fetching ingredients:", error);
        res.status(500).json({ success: false, message: "Failed to fetch ingredients" });
    }
});

module.exports = router;
