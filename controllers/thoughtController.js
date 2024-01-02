const { Thought, User } = require ('../models');

module.exports = {

    //get all thoughts

    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);

        } catch (err) {
            res.status(500).json(err)
        }
    },

    //get one thought

    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId })
                
            if (!thought) {
                return res.status(404).json({ message: 'No thought found with that id' });
            }

            res.json(thought);

        } catch (err) {
            res.status(500).json(err)
        }
    },

    //create a thought

    async createThought(req, res) {
        try {
            const ThoughtData = await Thought.create(req.body);
            res.json(ThoughtData);

        } catch (err) {
            res.status(500).json(err);
        }

    },

    //delete thought

    async deleteThought(req, res) {
        try {
            const ThoughtData = await Thought.findByIdAndDelete({ _id: req.params.thoughtId });
            if (!ThoughtData) {
                return res.status(404).json({ message: 'No user found with that id' });
            }
            res.json({ message: 'Deleted Thought'});

        } catch (err) {
            res.status(500).json(err);
        }

    },

    //update thought

    async updateThought(req, res) {
        try {
            const ThoughtData = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true}
                );

            if (!ThoughtData) {
                return res.status(404).json({ message: 'No thought found with that id' });
            }
            res.json(ThoughtData);

        } catch (err) {
            res.status(500).json(err);
        }

    },
//create reaction
    async createReaction(req, res) {
        try {
          const { thoughtId } = req.params;
          const { reactionBody, username } = req.body;
      
       
          const newReaction = {
            reactionBody,
            username,
          };
      
         
          const updatedThought = await Thought.findByIdAndUpdate(
            thoughtId,
            { $push: { reactions: newReaction } },
            { new: true }
          );
      
          if (!updatedThought) {
            return res.status(404).json({ message: 'No thought found with that id' });
          }
      
          res.json(updatedThought);
        } catch (err) {
          res.status(500).json(err);
        }
      },
      //delete reaciton
      
      async deleteReaction(req, res) {
        try {
          const { thoughtId, reactionId } = req.params;
      
          
          const updatedThought = await Thought.findByIdAndUpdate(
            thoughtId,
            { $pull: { reactions: { reactionId } } },
            { new: true }
          );
      
          if (!updatedThought) {
            return res.status(404).json({ message: 'No thought found with that id' });
          }
      
          res.json(updatedThought);
        } catch (err) {
          res.status(500).json(err);
        }
      },

}