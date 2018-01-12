const mongoose = require('mongoose')
const bcrypt = require("bcrypt")

const User = require('../models/User.js')

exports.signup = (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then(result => {
            if (result.length >= 1) {
                return res.status(422).json({
                    message: "This email is already registered"
                })
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        console.log(err)
                        res.status(500).json({ err })
                    } else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash
                        })

                        user.save()
                            .then(result => {
                                console.log(result)
                                res.status(201).json({
                                    message: "User created"
                                })
                            })
                            .catch(err => {
                                console.log(err)
                                res.status(500).json({ err })
                            })
                    }
                })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ err })
        })
}

exports.signin = (req, res, next) => {
    //signin logic
}