const { Schema, Types, model } = require('mongoose');


const reactionSchema = new Schema(
    {
      reactionId: {
        type: Types.ObjectId,
        default: () => new Types.ObjectId(),
      },
      reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
      },
      username: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
      },
    },
    {
      toJSON: {
        getters: true,
      },
    }
  );
  
  
  function dateFormat(timestamp) {
    return new Date(timestamp).toLocaleString();
  }


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

const Thought = model('thought', thoughtSchema)

module.exports = Thought;