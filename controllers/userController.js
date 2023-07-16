const { User, Thought } = require("../models");

module.exports = {
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async getOneUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .populate("thoughts")
        .populate("friends")
        .select("-__v");

      if (!user) {
        return res.status(404).json({ message: "No user with that ID" });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async createUser(req, res) {
    try {
      const user = await User.create(req.body);

      res.json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  async updateUser(req, res) {
    try {
      await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: { username: req.body.username } },
        { runValidators: true, new: true }
      );
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  async nukeUser(req, res) {
    try {
      const nuke = await User.findOneAndDelete({ _id: req.params.userId });
      if (!nuke) {
        return res
          .status(404)
          .json({ message: "Error nuking that user, now there's 2 of them!" });
      }
      const thoughts = await Thought.deleteMany({
        username: req.params.userId
      });
      res.json({ message: "User and associated thoughts have been nuked" });
    } catch (err) {
      res.status(500).json(err);
      console.log("Failed to nuke that user and their thoughts");
    }
  },
  async addFriend(req, res) {
    try {
      const { userId } = req.params;
      const { friendId } = req.body;

      if (!friendId) {
        throw new Error("Friend ID is missing");
      }

      const user = await User.findOneAndUpdate(
        { _id: userId },
        { $addToSet: { friends: friendId } }
      );

      res.status(200).json({ message: "Friend added successfully" });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  async nukeFriend(req, res) {
    try {
      const userId = req.params.userId;
      const friendId = req.body.friendId;
      const user = await User.findOneAndUpdate(
        { _id: userId },
        { $pull: { friends: friendId } }
      );

      if (!user.friends.includes(friendId)) {
        return res.status(404).json({
          message: "No friend with that ID in the user's friend list"
        });
      }

      await user.save();

      res.json({ message: "Friends successfully cut ties", user });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
};
