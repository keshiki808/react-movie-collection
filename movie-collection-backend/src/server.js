import express from "express";
import { MongoClient } from "mongodb";

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

app.listen(8000, () => console.log("Server is running on port 8000"));
