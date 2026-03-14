const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const DB_URL = process.env.db_url;

const connectToDb = () => {
    return mongoose.connect(DB_URL).then(() => {
        console.log("Database connected successfully");
    }).catch((err) => {
        console.log("Database connection error:", err);
    });
};

module.exports = connectToDb;