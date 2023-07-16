const { Thought, User } = require("../models");

module.exports = {
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async getOneThought(req, res) {
    try {
      const thought = await Thought.findOne({
        _id: req.params.thoughtId
      }).select("-__v");

      if (!thought) {
        return res.status(404).json({ message: "No thought with that ID" });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      //if no user then don't let thought get created, send error instead of res.json/status(400), require user to add thought, google response status codes, find appropriate 400 response for this scenario
      const user = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $push: { thoughts: thought._id } },
        { new: true }
      );
      if (!user) {
        return res
          .status(400)
          .json({ message: "No user found to think that thought..." });
      }
      res.json(thought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: { thoughtText: req.body.thoughtText } },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: "No thought with this id!" });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({
        _id: req.params.thoughtId
      }).select("-__v");

      if (!thought) {
        return res.status(404).json({ message: "No thought with that ID" });
      }
      // const thoughtThinker = await User.findOneAndUpdate(
      //   {
      //     _id: req.body.userId
      //   },
      //   { $pull: { thoughts: thoughtId } }
      // );
      // if (!thoughtThinker) {
      //   return res.status(404).json({ message: "No user with that thought" });
      // }
      // await thoughtThinker.save();
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async createReaction(req, res) {
    try {
      const { reaction } = req.body.reactionBody;
      const thoughtId = req.params.thoughtId;
      const thought = await Thought.findOneAndUpdate(
        { _id: thoughtId },
        { $push: { reactions: reaction } }
      );
      if (!thought) {
        return res.status(404).json({ message: "No thought with that ID" });
      }
      await thought.save();
      res
        .status(200)
        .json({ message: "Successfully added that reaction", thought });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async deleteReaction(req, res) {
    try {
      const reactionId = req.body.reactionId;
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: reactionId } }
      );
      if (!thought) {
        return res
          .status(404)
          .json({ message: "No thought with that reaction ID!" });
      }

      await thought.save();
      res.status(200).json({ message: "Removed that reaction", thought });
    } catch (err) {
      res.status(500).json(err);
    }
  }
};
