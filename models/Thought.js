const { Schema, Types } = require('mongoose');


const reactionSchema = require('./reactionSchema'); // Assuming the Reaction schema is in a separate file


const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
  }
);


thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});


function dateFormat(timestamp) {
  return new Date(timestamp).toLocaleString();
}