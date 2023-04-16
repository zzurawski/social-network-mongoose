const reaction = require('./reaction');
const {Schema, model} = require('mongoose');
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            maxLength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (date) => {return date.toISOString().split('T')[0]}
        },
        user: {
            type: String,
            required: true
        },
        reactions: [reaction]
    },
    {
        toJSON: { getters: true},
        id: false,
    }
);

thoughtSchema
    .virtual('reactionCount')
    .get(function() {return this.reaction.length});

const Thought = model('Thought', thoughtSchema);
model.exports = Thought;