const express = require("express");
const router = express.Router();
const userController = require("../controllers/users");

const { validateParam,validateBody,schemas } = require("../helpers/routeHelpers");

router
  .route("/")
  .get(userController.index)
  .post(validateBody(schemas.userSchema),userController.newUser);

router
  .route("/:userId")
  .get(validateParam(schemas.idSchema, "userId"), userController.getUser)
  .put([validateParam(schemas.idSchema,"userId"),validateBody(schemas.userSchema)],userController.replaceUser)
  .patch([validateParam(schemas.idSchema,"userId"),validateBody(schemas.userOptionSchema)],userController.updateUser);

router
  .route("/:userId/cars")
  .get(validateParam(schemas.idSchema,"userId"),userController.getUserCar)
  .post([validateParam(schemas.idSchema,"userId"),validateBody(schemas.carSchema)],userController.newUserCar);

module.exports = router;
