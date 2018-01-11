const express = require('express');
const router = express.Router();
const GoalsController = require('../controllers/GoalsController')

router.get('/', GoalsController.getAll)
router.post('/', GoalsController.create)
router.get('/:id', GoalsController.get)
router.patch('/:id', GoalsController.update)
router.delete('/:id', GoalsController.delete)

module.exports = router