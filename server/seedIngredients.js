const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Ingredient = require('./Models/Ingredient');

dotenv.config();

const DB_URL = process.env.db_url;

const ingredients = [
    { id: 1, name: 'Aloo Tikki', price: 20, color: "bg-amber-700" },
    { id: 2, name: 'Paneer', price: 25, color: "bg-neutral-400" },
    { id: 3, name: 'Cheese', price: 15, color: "bg-yellow-400" },
    { id: 4, name: 'Tomato', price: 10, color: "bg-red-500" },
    { id: 5, name: 'Onion', price: 10, color: "bg-purple-400" },
    { id: 6, name: 'Lettuce', price: 8, color: "bg-green-500" }
];

const seedIngredients = async () => {
    try {
        await mongoose.connect(DB_URL);
        console.log("Connected to database.");

        await Ingredient.deleteMany({});
        console.log("Cleared existing ingredients collection.");

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