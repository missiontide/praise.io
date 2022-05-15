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

// mongoDB connection settings
const { MongoClient, ServerApiVersion } = require('mongodb');
const assert = require('assert');
const uri = require("./privateServerInfo");
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

// creating route to make request to server for API
app.get("/songs", function(req, res) {
    client.connect(err => {
        const collection = client.db("praisedb").collection("songs");
        // perform actions on the collection object
        collection.find().project({id:1, title:1, artist:1}).toArray(function(err, result) {
            if (err) throw err;
            res.json(result);

            client.close();
        });
    });
})

app.get("/lyrics", (req, res) => {
    // parse query for selected song ids
    if (req.query.songs === undefined) {
        res.status(404).end();
        return;
    }
    const selectedSongIds = req.query.songs.split(",").map(Number);

    // get selected songs from mongoDB
    client.connect(err => {
        const collection = client.db("praisedb").collection("songs");
        // perform actions on the collection object
        collection.find(
            {id: {$in : selectedSongIds}}
        ).toArray(function(err, result) {
            if (err) throw err;
            res.json(result);

            client.close();
        });
    });
})

// app is listening on port 5000
app.listen(5000, () => {
    console.log("server is running on port 5000");
})