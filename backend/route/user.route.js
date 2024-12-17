import { Router } from "express"
import { fetchLoggedInUser, getUserDetails, login, logout, signUp } from "../controllers/user.controller.js"
import { jwtVerify } from "../middlewares/jwtVerify.js"


const router = Router()

router.post("/signup",signUp)
router.post("/login",login)
router.post("/logout",logout)
router.get("/getUserDetails",jwtVerify,getUserDetails)
router.get("/fetchLoggedInUser",jwtVerify,fetchLoggedInUser)

export default router