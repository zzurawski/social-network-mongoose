const { Thought } = require('../models');

module.exports = {
    getThoughts(req, res) {
        Thought.find()
            .then((thought) => {res.json(thought)})
            .catch((err) => res.status(500).json(err))
    }
},{
    getOneThought(req, res) {
        Thought.findOne({_id: req.params.thoughtId})
            .select('-__v')
            .then((thought) => {res.json(thought)})
            .catch((err) => res.status(500).json(err))
    }
},{
    makeThought(req, res) {
        Thought.create(req.body) 
            .then((thought) => {res.json(thought)})
            .catch((err) => {res.status(500).json(err)})
    }
},{
    deleteThought(req, res) {
        Thought.findOneAndDelete({__id: req.params.thoughtId})
            .select('-__v')
            .then((thought) => res.json(thought))
            .catch((err) => res.status(500).json(err))
    }
},{
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            {__id: req.params.thoughtId},
            {$set: req.body},
            {new: true}
        )
            .then((thought) => 
                !thought
                    ? res.status(404).json({message: 'no thought found'})
                    : res.json(thought)
            )
            .catch((err) => {res.status(500).json(err)})
    }
},{
    makeReaction(req, res) {
        Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$addToSet: {reactions: req.body}},
            {new: true}
        )   
        .then((thoughts) => {
            !thoughts
                ? res.status(404).json({ message: "No thought found with this id number!" })
                : res.json(thoughts);
      })
      .catch((err) => {res.status(500).json(err)}
        )
    }
}