const mongoose = require('mongoose')
const Goal = require('../models/Goal.js')

exports.getAll = (req, res, next) => {
    Goal.find()
        .exec()
        .then(result => {
            res.status(200).json({
                count: result.length,
                goals: result
            })            
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ err })
        })
}

exports.get = (req, res, next) => {
    const id = req.params.id
    Goal.findById(id)
        .exec()
        .then(result => {
            if (result) {
                res.status(200).json({ result })
            } else {
                res.status(404).json({
                    error: {
                        message: "Goal with given id does not exist."
                    }
                })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ err })
        })
}

exports.create = (req, res, next) => {
    const goal = new Goal({
        _id: new mongoose.Types.ObjectId(),
        definition: req.body.definition,
        positiveOutcome: req.body.positiveOutcome,
        negativeOutcome: req.body.negativeOutcome,
        obstacle: req.body.obstacle,
        plan: req.body.plan
    })
    goal
        .save()
        .then(result => {
            console.log(result)
            res.status(201).json({
                message: "Goal created successfully",
                createdGoal: goal
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ err })
        })
}

exports.delete = (req, res, next) => {
    const id = req.params.id
    Goal.remove({ _id: id })
        .exec()
        .then(result => {
            if (result.n) {
                res.status(200).json({
                    message: "Goal with id: " + id + " has been deleted."
                })
            } else {
                res.status(404).json({
                    error: {
                        message: "Goal with given id does not exist."
                    }
                })
            }            
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ err })
        })
}

exports.update = (req, res, next) => {
    const id = req.params.id
    const updateOps = {}
    for (let ops of req.body) {
        updateOps[ops.propName] = ops.value
    }
    Goal.update({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Goal with id: " + id + " has been updated."
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ err })
        })
}