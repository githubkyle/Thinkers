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
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
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
          .json({ message: "Error nuking user, now there's 2 of them!" });
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
  async addFriend(req,res) {
      try{
          const user = await User.findOne({ _id: req.params.userId });
          if(!user){
              return res.status(404).json({message: "Error finding that user"}));
          }
          const friend = await User.findOne({_id: req.params.friendId});
          if(!friend){
              return res.status(404).json({message: "Couldn't find that friend"});
          }
          user.friends.push(friend._id);
          await user.save();
          res.json({ message: 'Successfully added friend!', user });
      }
      catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
  },
  async nukeFriend(req,res) {
    try {
        const user = await User.findOne({ _id: req.params.userId });
        if (!user) {
          return res.status(404).json({ message: 'No users with that ID' });
        }
    
        const friendId = req.params.friendId;
        if (!user.friends.includes(friendId)) {
          return res.status(404).json({ message: 'No friend with that ID in the user\'s friend list' });
        }
    
        user.friends.pull(friendId);
        await user.save();
    
        res.json({ message: 'Friend successfully removed', user });
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
  }
};
