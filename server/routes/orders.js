const express = require('express');
const router = express.Router();
const Order = require('../Models/Order');

const Ingredient = require('../Models/Ingredient');
const { calculatePrice } = require('../utils/priceCalculator');

router.post('/', async (req, res) => {
    try {
        const { slices, quantity, status, customerDetails } = req.body;

        if (!slices || !Array.isArray(slices) || slices.length === 0) {
            return res.status(400).json({ success: false, message: "Order must contain at least one slice" });
        }

        const uniqueSliceIds = [...new Set(slices.map(s => s.id))];
        const ingredients = await Ingredient.find({ id: { $in: uniqueSliceIds } });

        let priceDetails;
        try {
            priceDetails = calculatePrice(slices, ingredients, quantity);
        } catch (error) {
            return res.status(400).json({ success: false, message: error.message });
        }

        const newOrder = new Order({
            slices,
            quantity,
            priceDetails,
            status,
            customerDetails
        });

        const savedOrder = await newOrder.save();
        res.status(201).json({ success: true, order: savedOrder });
    } catch (error) {
        console.error("Error saving order:", error);
        res.status(500).json({ success: false, message: "Failed to save order" });
    }
});

router.post('/update-status', async (req, res) => {
    try {
        const { orderId, status } = req.body;
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }
        order.status = status;
        await order.save();
        res.status(200).json({ success: true, order: order });
    } catch (error) {
        console.error("Error updating order status:", error);
        res.status(500).json({ success: false, message: "Failed to update order status" });
    }
});

router.get('/', async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, orders: orders });
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ success: false, message: "Failed to fetch orders" });
    }
});

module.exports = router;
