import express from "express"
import { getMessage, sendMessage } from "../controllers/message.controllers.js"
import { jwtVerify } from "../middlewares/jwtVerify.js"

const router = express.Router()

router.post("/send/:id",jwtVerify,sendMessage)
router.get("/get/:id",jwtVerify,getMessage)

export default router