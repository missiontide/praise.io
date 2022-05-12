// api/server.js
//importing all the module
const express = require("express");
const cors = require("cors");

// initializing app
const app = express();

// initializing cors middleware for all routes
app.use(cors());

// importing JSON data from songs.js
const data = require("./songs");
// creating route to make request to server for API
app.get("/songs", function(req, res) {
    res.json(data);
})

// app is listening on port 5000
app.listen(5000, () => {
    console.log("server is running on port 5000");
})