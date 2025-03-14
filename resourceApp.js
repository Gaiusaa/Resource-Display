// Dependencies
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

// App
const app = express();

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.static("public"));

// Route
app.use(require("./router/index"));

// Function
const onConnect = () => {
    console.log(`App is running on port ${process.env.PORT}`);
};

// DB
dbConnect();
async function dbConnect() {
    try {
        let connected = null;
        let attempts = 0;
        let maxAttempts = 5;
        while (!connected) {
            attempts += 1
            connected = await mongoose.connect(process.env.DB_URI);
            if (connected) {
                break;
            } else if (attempts >= maxAttempts) {
                console.error(`Max attempts reached for DB connect`);
            };
        };
        app.listen(process.env.PORT, onConnect);
        
    } catch(error) {
        console.log(`An error occurred connecting to DB: ${error}`);
    };
};