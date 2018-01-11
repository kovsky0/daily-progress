//const Goal = require('../models/Goal.js')

exports.getAll = (req, res, next) => {
    res.status(200).json({
        message: 'Goals Controller: getAll func'
    })
}

exports.get = (req, res, next) => {
    res.status(200).json({
        message: 'Goals Controller: get func'
    })
}

exports.create = (req, res, next) => {
    res.status(200).json({
        message: 'Goals Controller: create func'
    })
}

exports.delete = (req, res, next) => {
    res.status(200).json({
        message: 'Goals Controller: delete func'
    })
}

exports.update = (req, res, next) => {
    res.status(200).json({
        message: 'Goals Controller: update func'
    })
}