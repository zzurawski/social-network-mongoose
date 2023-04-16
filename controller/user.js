const {User, Thought} = require('../models');

model.exports = {
    getUsers(req, res) {
        User.find()
            .then((users) => res.json(users))
            .catch ((err) => res.status(500).json(err));
    }
},{
    getUserById(req, res) {
        User.findOne({_id: req.params.userId})
            .then((user) => 
                !user
                    ? res.status(404).json({message: 'no user found'})
                    : res.json(user))
            .catch((err) => {res.status(500).json(err)})
    }
},{
    makeUser(req, res) {
        User.create(req.body)
            .then((user) => {res.json(user)})
            .catch((err) => {res.status(500).json(err)})
    }
},{
    deleteUser(req, res) {
        User.findOneAndDelete({_id: req.params.userId})
            .then((user) => 
                !user
                    ? res.status(404).json({message: 'no user found'})
                    : Thought.deleteMany({_id:{$in: user.thoughts}})
            )
            .catch((err) => {res.status(500).json(err)})
    }
},{
    updateUser(req, res) {
        User.findOneandUpdate(
            {_id: req.params.userId},
            {$set: req.body},
            {new: true}
        )
            .then((user) => 
                !user  
                    ? res.status(404).json({message: 'no user found'})
                    : res.json(user)
            )
            .catch((err) => {res.status(500).json(err)})
    }
}, {
    addFriend(req, res) {
        User.findOneAndUpdate(
            {_id: req.params.userId},
            {$addToSet: { friends: req.params.friendsId }}
        )
            .then((user) => 
                !user
                    ? res.status(404).json({message: 'no user found'})
                    : res.json(user)
            )
            .catch((err) => {res.status(500).json(err)})
    }
},{
    removeFriend(req, res) {
        User.findOneAndUpdate(
            {_id: req.params.userId},
            {$pull: {friends: req.params.friendId}}
        )
            .then((user) => 
                !user
                    ? res.status(400).json({message: 'no user found'})
                    : res.json(user)
            )
            .catch((err) => {res.status(500).json(err)})
    }
}