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
            const thoguht = await Thought.findOne({ _id: req.params.ThoughtId })
                
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
            const ThoughtData = await Thought.findByIdAndDelete({ _id: req.params.ThoughtId });
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
                { _id: req.params.ThoughtId },
                { $set: req.body },
                { runValidators: true, new: true}
                );

            if (!ThoughtData) {
                return res.status(404).json({ message: 'No user found with that id' });
            }
            res.json(ThoughtData);

        } catch (err) {
            res.status(500).json(err);
        }

    },

    // create reaction

    //delete reaction

}