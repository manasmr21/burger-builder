const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    slices: [{
        type: Number,
        required: true
    }],
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    priceDetails: {
        basePrice: { type: Number, required: true },
        discount: { type: Number, default: 0 },
        penalty: { type: Number, default: 0 },
        platformFee: { type: Number, required: true },
        finalPrice: { type: Number, required: true }
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Order', orderSchema);
