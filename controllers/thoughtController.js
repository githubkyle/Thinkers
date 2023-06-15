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
      const thoughtText = req.body.thoughtText;
      const username = req.body.username;
      const reactions = req.body.reactions;
      const user = await User.findOne({ username });

      // if (!user) {
      //   return res.status(404).json({ error: "User not found" });
      // }

      const newThought = new Thought({ thoughtText, username, reactions });

      if (!user.thoughts) {
        user.thoughts = [];
      }

      user.thoughts.push(newThought);

      await user.save();

      res.json(newThought);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to create that thought" });
    }
  },
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
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
      });

      if (!thought) {
        return res.status(404).json({ message: "No thought with that ID" });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async createReaction(req, res) {
    try {
      const { reaction } = req.body;
      const thought = await Thought.findOne({ _id: req.params.thoughtId });
      if (!thought) {
        return res.status(404).json({ message: "No thought with that ID" });
      }

      thought.reactions.push(reaction);
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
      const reactionId = req.params.reactionId;
      const thought = await Thought.findOne({
        reactions: { $in: [reactionId] }
      });
      if (!thought) {
        return res
          .status(404)
          .json({ message: "No thought with that reaction ID!" });
      }
      thought.reactions.pull(reactionId);
      await thought.save();
      res.status(200).json({ message: "Removed that reaction", thought });
    } catch (err) {
      res.status(500).json(err);
    }
  }
};
