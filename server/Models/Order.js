const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    slices: [{
        id: { type: Number, required: true },
        type: { type: String, required: true },
        name: { type: String, required: true },
        price: { type: Number, required: true }
    }],
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    status: {
        type: String,
        enum: ['Completed', 'Cancelled', 'Placed']
    },
    customerDetails: {
        name: { type: String },
        phone: { type: String },
        address: { type: String },
        paymentMethod: { type: String, enum: ['UPI', 'NetBanking', 'CreditCard', 'DebitCard'] }
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

module.exports = mongoose.model('Order-bb', orderSchema);
