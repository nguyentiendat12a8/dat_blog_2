const { verifySignUp, authJwt } = require("../app/middlewares");
const controller = require("../app/controllers/auth.controller");
const express = require('express');
const router = express.Router();


  router.post(
    
    "/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  );

  

  router.post("/signin", controller.signin);
  router.post("/verifyToken",[authJwt.verifyToken, authJwt.isAdmin], controller.verifyToken);

  module.exports = router;

