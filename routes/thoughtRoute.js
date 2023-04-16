const router = require('express').Router();
const {
    getThoughts,
    getOneThought,
    makeThought,
    deleteThought,
    updateThought,
    makeReaction,
} = require('../controller/thought');

router.route('/')
    .get(getThoughts)
    .post(makeThought);

router.route('/:thoughtId')
    .get(getOneThought)
    .delete(deleteThought)
    .put(updateThought);

router.route('/:thoughtId/reactions/:reactionId')
    .post(makeReaction)