const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

const DataModel = require("./DataModel")
const connectDB = require("./Database");
connectDB();

const app = express();
app.use(express.json({ extended: false }));

//we need cors middleware here because frontend and backend run on different ports.
const cors = require("cors");
app.use(cors());

app.get("/readfromserver", (req, res) => {
  res.json({message: "Hey man from server"});
})

app.post("/writetodatabase", async (req, res) => {
  try {
    const {content} = req.body;
    const newData = new DataModel({ content });
    await newData.save();
    res.json({message: "Data saved successfully / Данные сохранены"})
  } catch (error) {
    console.log("Ошибка сервера при сохранении данных", error.message);
    res.status(500).send("Server error while saving data/Ошибка сервера при сохранении данных")
  }
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server is running on PORT: ${PORT}`);
})

/*
OPTIONAL: FOR DEPLOYMENT
//import path package
const path = require('path');
// Serve static files from the React app by using path package
app.use(express.static(path.join(__dirname, 'client/build')));
// Handle any requests that don't match the above
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});
//on client CMD, "npm build"
//also remove "build" entry from client .gitignore
//also you'll need to enter .env connection string as an environment variable in your platform
//also make sure you are using relative paths in your react components for server.js routes
*/