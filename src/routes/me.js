const express = require('express');
const router = express.Router();

const meController = require('../app/controllers/MeController');

const { authJwt } = require("../app/middlewares");

router.get('/stored/courses',[authJwt.verifyToken,authJwt.isAdmin], meController.storedCourses);
router.get('/trash/courses',[authJwt.verifyToken,authJwt.isAdmin], meController.trashCourses);


module.exports = router;
