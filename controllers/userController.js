const { Thought, User } = require ('../models');

module.exports = {

    //get all users

    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);

        } catch (err) {
            res.status(500).json(err)
        }
    },

    //get one user

    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.UserId })
                
            if (!user) {
                return res.status(404).json({ message: 'No user found with that id' });
            }

            res.json(user);

        } catch (err) {
            res.status(500).json(err)
        }
    },

    //create a user

    async createUser(req, res) {
        try {
            const UserData = await User.create(req.body);
            res.json(UserData);

        } catch (err) {
            res.status(500).json(err);
        }
    
    },

    //delete user

    async deleteUser(req, res) {
        try {
            const UserData = await User.findByIdAndDelete({ _id: req.params.UserId });
            if (!UserData) {
                return res.status(404).json({ message: 'No user found with that id' });
            }
            res.json({ message: 'Deleted User'});

        } catch (err) {
            res.status(500).json(err);
        }
    
    },

    //update user

    async updateUser(req, res) {
        try {
            const UserData = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { runValidators: true, new: true}
                );

            if (!UserData) {
                return res.status(404).json({ message: 'No user found with that id' });
            }
            res.json(UserData);

        } catch (err) {
            res.status(500).json(err);
        }
    
    },




};