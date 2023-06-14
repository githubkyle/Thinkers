// const express = require("express");
// const app = express();
// app.use(express.json());
// const mongoose = require("mongoose");
// let db = mongoose.connect("mongodb://localhost/thought-network-db");

// app.post("/create", (req, res) => {
//   const { thoughtText, username } = req.body;

//   db.collection("thoughtCollection")
//     .insertOne({ thoughtText, username, createdAt: new Date() })
//     // Sends results
//     .then(result => {
//       res.status(201).json(result.ops[0]);
//     })
//     .catch(err => {
//       console.error(err);
//       res.status(500).json({ error: "Failed to create that thought" });
//     });
// });

// app.get("/see", (req, res) => {
//   db.collection("thoughtCollection")
//     .find({})
//     .toArray()
//     .then(results => res.json(results))
//     .catch(err => {
//       if (err) throw err;
//     });
// });
const router = require("express").Router();

const {
  getThoughts,
  getOneThought,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction
} = require("../../controllers/thoughtController");

router
  .route("/")
  .get(getThoughts)
  .post(createThought);

router
  .route("/:thoughtId")
  .get(getOneThought)
  .put(updateThought)
  .delete(deleteThought)
  .delete(deleteReaction)
  .post(createReaction);

module.exports = router;
