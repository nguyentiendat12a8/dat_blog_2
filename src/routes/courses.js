const express = require('express');
const router = express.Router();

const catchHandler = require('../util/catchHandler')

const courseController = require('../app/controllers/CourseController');

const {authJwt} = require('../app/middlewares')


router.get('/create', [authJwt.verifyToken],courseController.create);
router.get('/:id/edit',[authJwt.verifyToken],courseController.edit);
router.post('/store',[authJwt.verifyToken], catchHandler(courseController.store));
router.put('/:id',[authJwt.verifyToken], courseController.update);
router.patch('/:id/restore',[authJwt.verifyToken], courseController.restore);
router.delete('/:id',[authJwt.verifyToken],courseController.delete)
router.delete('/:id/force',[authJwt.verifyToken],courseController.forceDelete)
router.get('/:slug',[authJwt.verifyToken], courseController.show);

module.exports = router;
