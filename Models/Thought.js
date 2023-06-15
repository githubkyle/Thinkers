<<<<<<< HEAD
const { Schema, mongoose } = require("mongoose");

const reactionSchema = new Schema({
  text: {
    type: String
  }
});
=======
const { Schema } = require("mongoose");
>>>>>>> f773455a9ca237f3ab66d92689fb1d841930068c

const thoughtsSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280
  },
  username: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: function(timestamp) {
      return new Date(timestamp).toLocaleString;
    }
  },
<<<<<<< HEAD
  reactions: [reactionSchema]
=======
  reactions: [reactionSchema],
  toJSON: {
    virtuals: true
  }
>>>>>>> f773455a9ca237f3ab66d92689fb1d841930068c
});

thoughtsSchema.virtual("reactionCount").get(function() {
  return this.reactions.length;
});

<<<<<<< HEAD
const Thought = mongoose.model("Thought", thoughtsSchema);
=======
const Thought = mongoose.model("Thought", thoughtSchema);
>>>>>>> f773455a9ca237f3ab66d92689fb1d841930068c

module.exports = Thought;
