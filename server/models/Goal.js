const mongoose = require('mongoose')

const goalSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    //user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    definition: { type: String, required: true },
    positiveOutcome: String,
    negativeOutcome: String,
    obstacle: String,
    plan: String
})

module.exports = mongoose.model('Goal', goalSchema)