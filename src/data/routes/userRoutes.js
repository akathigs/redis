import express from "express"
import * as userController from "../controllers/userControllers.js"
import * as authController from "../controllers/authControllers.js"

const router = express.Router()

router.get("/", userController.getAllUsers)
router.post("/",userController.createUser)
router.get("/:id", userController.getById)
router.put("/:id/:data", userController.updateUser)
router.delete("/:id", userController.deleteUser)

router.post("/login", authController.login)
router.post("/private", authController.verificarToken, userController.autenticadedRoute)

export default router