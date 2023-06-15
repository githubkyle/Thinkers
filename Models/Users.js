const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: function(value) {
        const emailRegex = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
        return emailRegex.test(value);
      },
      message: "That wasn't a valid email address, try again"
    }
  },
  thoughts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Thought"
    }
  ],
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: "Users"
    }
  ]
});

userSchema.virtual("friendCount").get(function() {
  return this.friends.length;
});

const Users = model("Users", userSchema);

module.exports = Users;
