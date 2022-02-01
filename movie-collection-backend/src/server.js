import express from "express";
import { MongoClient } from "mongodb";
import { unlink } from "fs";
import path from "path";

const multer = require("multer");
const cors = require("cors");
const mongo = require("mongodb");
const fs = require("fs");

const app = express();

app.use(express.static(path.join(__dirname, "/build")));

app.use(cors());

app.use("/public", express.static("public"));

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/movies/", async (req, res) => {
  try {
    const client = await MongoClient.connect("mongodb://localhost:27017");
    const db = client.db("movie-collection");
    const movieInfo = await db.collection("movies").find({}).toArray();
    res.status(200).json(movieInfo);
    client.close();
  } catch (error) {
    res.status(500).json({ message: "Error connecting to database: ", error });
  }
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage }).single("file");

app.post("/api/upload", async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).json(err);
    }

    try {
      const client = await MongoClient.connect("mongodb://localhost:27017");
      const db = await client.db("movie-collection");

      const formattedActors = req.body.actors.split(",").map((actor) => {
        return actor.trim();
      });

      const rating = parseInt(req.body.rating);

      await db.collection("movies").insertOne({
        name: req.body.name,
        releaseDate: req.body.releaseDate,
        actors: formattedActors,
        moviePoster: req.file.filename,
        rating: rating,
      });
      console.log(formattedActors);
      console.log(req.file, req.body);
      res.status(200).json({ message: "Success" });
      client.close();
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error connecting to database: ", error });
    }
  });
});

app.delete("/api/delete/:id", async function (req, res) {
  try {
    const client = await MongoClient.connect("mongodb://localhost:27017");
    const id = req.params.id;
    const db = await client.db("movie-collection");
    const movie = await db
      .collection("movies")
      .find({ _id: new mongo.ObjectID(id) })
      .toArray();
    const posterName = movie[0].moviePoster;
    await db
      .collection("movies")
      .deleteOne({ _id: new mongo.ObjectID(id) }, function (err, results) {});
    fs.unlink(`./public/images/${posterName}`, (err) => {
      if (err) throw err;
      console.log("Poster was deleted");
    });

    res.json({ success: id });
  } catch (error) {
    res.status(500).json({ message: "Error deleting item: ", error });
  }
});

app.post("/api/addjson", async function (req, res) {
  try {
    const client = await MongoClient.connect("mongodb://localhost:27017");
    const db = await client.db("movie-collection");
<<<<<<< HEAD
=======
    // const data = JSON.parse(req);
    // console.log(data);

    // const data = JSON.parse(req.body);

    console.log(data);

    console.log(req.body);
>>>>>>> ae6008607d8345bc6d17a234f7cd89d88867c3f3

    await db.collection("movies").insertMany(req.body, function (err, result) {
      console.log(result);
    });
    res.status(200).json({ message: "Success" });
  } catch (error) {
    res.status(500).json({ message: "Error adding JSON: ", error });
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/build/index.html"));
});

app.listen(8000, () => console.log("Server is running on port 8000"));
