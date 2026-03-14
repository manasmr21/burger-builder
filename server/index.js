const express = require("express");
const connectToDb = require("./Database/db");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

const port = process.env.PORT || 5000;

app.listen(port, () => {
    connectToDb().then(() => {
        console.log(`Server is running on port ${port}`)
    })
})

app.get("/", (req, res) => {
    res.send("MMMM... Delicioso... 😋🍴");
})