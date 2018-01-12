const express = require('express')
const router = express.Router()
const GoalsController = require('../controllers/GoalsController')
const checkAuth = require('../middleware/check-auth')

router.get('/', checkAuth, GoalsController.getAll)
router.post('/', checkAuth, GoalsController.create)
router.get('/:id', checkAuth, GoalsController.get)
router.patch('/:id', checkAuth, GoalsController.update)
router.delete('/:id', checkAuth, GoalsController.delete)

module.exports = router