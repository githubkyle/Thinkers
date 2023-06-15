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
