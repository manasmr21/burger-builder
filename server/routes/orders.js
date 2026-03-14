const express = require('express');
const router = express.Router();
const Order = require('../Models/Order');

const Ingredient = require('../Models/Ingredient');

router.post('/', async (req, res) => {
    try {
        const { slices, quantity } = req.body;

        if (!slices || !Array.isArray(slices) || slices.length === 0) {
            return res.status(400).json({ success: false, message: "Order must contain at least one slice" });
        }

        // 1. Fetch all ingredients that are in the user's burger
        // The slices array might have duplicates (e.g. 2 cheese slices), so we fetch unique ingredients first
        const uniqueSliceIds = [...new Set(slices)];
        const ingredients = await Ingredient.find({ id: { $in: uniqueSliceIds } });
        
        // Create a lookup map for quick price access
        const ingredientMap = {};
        ingredients.forEach(ing => {
            ingredientMap[ing.id] = ing.price;
        });

        // 2. Calculate Base Price
        let basePrice = 0;
        for (const sliceId of slices) {
            if (ingredientMap[sliceId] === undefined) {
                 return res.status(400).json({ success: false, message: `Invalid ingredient ID: ${sliceId}` });
            }
            basePrice += ingredientMap[sliceId];
        }

        basePrice = basePrice * quantity;

        // 3. Optional: apply any discounts, penalties, or platform fees here
        // For now, we'll keep it simple
        const discount = 0;
        const penalty = 0;
        const platformFee = 2; // Fixed platform fee
        const finalPrice = basePrice - discount + penalty + platformFee;

        const priceDetails = {
            basePrice,
            discount,
            penalty,
            platformFee,
            finalPrice
        };
        
        const newOrder = new Order({
            slices,
            quantity,
            priceDetails
        });

        const savedOrder = await newOrder.save();
        res.status(201).json({ success: true, order: savedOrder });
    } catch (error) {
        console.error("Error saving order:", error);
        res.status(500).json({ success: false, message: "Failed to save order" });
    }
});

router.get('/', async (req, res) => {
    try {
        // Find all orders and sort them by descending creation date (newest first)
        const orders = await Order.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, orders: orders });
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ success: false, message: "Failed to fetch orders" });
    }
});

module.exports = router;
