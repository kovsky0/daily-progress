const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../config')

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
    User.find({ email: req.body.email })
        .exec()
        .then(result => {
            if (result.length < 1) {
                return res.status(401).json({
                    error: {
                        message: "Authorization failed."
                    }
                })
            }
            
            bcrypt.compare(req.body.password, result[0].password, (err, authenticated) => {
                if (err) {
                    return res.status(401).json({
                        error: {
                            message: "Authorization failed."
                        }
                    })
                }

                if (!authenticated) { //passwords do not match
                    return res.status(401).json({
                        error: {
                            message: "Authorization failed."
                        }
                    })
                }

                const token = jwt.sign(
                    {
                        email: result[0].email,
                        userId: result[0]._id
                    },
                    config.jwtKey,
                    {
                        expiresIn: "1h"
                    }
                )
                res.status(200).json({ 
                    message: "Authentication successful",
                    token: token
                })
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ err })
        })
}