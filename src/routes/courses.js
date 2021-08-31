const express = require('express');
const router = express.Router();

const catchHandler = require('../util/catchHandler')

const courseController = require('../app/controllers/CourseController');

router.get('/create', courseController.create);
router.get('/:id/edit',courseController.edit);
router.post('/store', catchHandler(courseController.store));
router.put('/:id', courseController.update);
router.patch('/:id/restore', courseController.restore);
router.delete('/:id',courseController.delete)
router.delete('/:id/force',courseController.forceDelete)
router.get('/:slug', courseController.show);

module.exports = router;
