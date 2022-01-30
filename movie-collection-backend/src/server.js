import express from "express";
import { MongoClient } from "mongodb";

// const express = require('express')
const multer = require("multer");
// const cors = require("cors");

const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/movies/", async (req, res) => {
  // const movieName = req.params.name;
  try {
    const client = await MongoClient.connect("mongodb://localhost:27017");
    const db = client.db("movie-collection");
    const movieInfo = await db.collection("movies").find({}).toArray();
    res.status(200).json(movieInfo);
    (await client).close();
  } catch (error) {
    res.status(500).json({ message: "Error connecting to database: ", error });
  }
});

// app.post("/api/movies/", async (req, res) => {
//   const {id, name, releaseDate, actors, moviePoster, rating} = req.body
//   try{

//   })

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage }).single("file");

app.post("/api/upload", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(500).json(err);
    }

    // // const {id, name, releaseDate, actors, moviePoster, rating} = req.body
    // const client = await MongoClient.connect("mongodb://localhost:27017");
    // const db = client.db("movie-collection");

    // await db.collection("movies").insertOne({
    //   name: req.body.name,
    //   date: req.body.releaseDate,
    //   actors: req.body.actors,
    //   moviePoster: req.file.filename,
    //   rating: req.body.rating,
    // });

    return res.status(200).send(req);
  });
});

app.listen(8000, () => console.log("Server is running on port 8000"));
