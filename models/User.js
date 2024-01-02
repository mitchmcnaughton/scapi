const { Schema, Types } = require('mongoose');

const userSchema = new Schema (
    {
        username: {
          type: String,
          required: true,
          unique: true,
          trim: true,
        },
        email: {
          type: String,
          required: true,
          unique: true,
          match: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
        },
        thoughts: [
          {
            type: Types.ObjectId,
            ref: 'Thought',
          },
        ],
        friends: [
          {
            type: Types.ObjectId,
            ref: 'User',
          },
        ],
      },
      {
        toJSON: {
          virtuals: true,
          getters: true,
        },
        id: false,
      }
    );
    
   
    userSchema.virtual('friendCount').get(function () {
      return this.friends.length;
    }
);