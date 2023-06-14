const { Schema } = require("mongoose");

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
      type: mongoose.Schema.Types.ObjectID,
      ref: "Thought"
    }
  ],
  friends: [
    {
      type: mongoose.Schema.Types.ObjectID,
      ref: "User"
    }
  ],
  toJSON: {
    virtuals: true
  }
});

userSchema.virtual("friendCount").get(function() {
  return this.friends.length;
});

// module.exports = userSchema;

const User = mongoose.model("User", userSchema);

module.exports = User;
