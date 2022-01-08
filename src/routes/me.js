const express = require('express');
const router = express.Router();

const meController = require('../app/controllers/MeController');

const { authJwt } = require("../app/middlewares");

router.get('/stored/courses',[authJwt.verifyToken], meController.storedCourses);//[authJwt.verifyToken,authJwt.isAdmin]
router.get('/trash/courses', meController.trashCourses);//[authJwt.verifyToken,authJwt.isAdmin]


module.exports = router;
