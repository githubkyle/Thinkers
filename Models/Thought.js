const { Schema } = require("mongoose");

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
  reactions: [reactionSchema],
  toJSON: {
    virtuals: true
  }
});

thoughtsSchema.virtual("reactionCount").get(function() {
  return this.reactions.length;
});

const Thought = mongoose.model("Thought", thoughtSchema);

module.exports = Thought;
