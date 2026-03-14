const express = require("express");
const cors = require("cors");
const connectToDb = require("./Database/db");
const dotenv = require("dotenv");
const Order = require("./Models/Order");
const orderRoutes = require('./routes/orders');
const ingredientRoutes = require('./routes/ingredients');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;

app.listen(port, () => {
    connectToDb().then(() => {
        console.log(`Server is running on port ${port}`)
    })
})

app.get("/", (req, res) => {
    res.send("MMMM... Delicioso... 😋🍴");
});

app.use("/api/orders", orderRoutes);
app.use("/api/ingredients", ingredientRoutes);