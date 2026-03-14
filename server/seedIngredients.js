const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Ingredient = require('./Models/Ingredient');

dotenv.config();

const DB_URL = process.env.db_url;

const ingredients = [
    { id: 1, name: 'Aloo Tikki', price: 20 },
    { id: 2, name: 'Paneer', price: 25 },
    { id: 3, name: 'Cheese', price: 15 },
    { id: 4, name: 'Tomato', price: 10 },
    { id: 5, name: 'Onion', price: 10 },
    { id: 6, name: 'Lettuce', price: 8 }
];

const seedIngredients = async () => {
    try {
        await mongoose.connect(DB_URL);
        console.log("Connected to database.");

        // Clear existing ingredients just in case we run this multiple times
        await Ingredient.deleteMany({});
        console.log("Cleared existing ingredients collection.");

        // Insert new ingredients
        await Ingredient.insertMany(ingredients);
        console.log("Successfully seeded ingredients collection!");

        mongoose.connection.close();
        process.exit(0);
    } catch (error) {
        console.error("Error seeding database:", error);
        process.exit(1);
    }
};

seedIngredients();
