import express from 'express'
import { login, signup, updateCurrency } from '../controller/user.controller.js'
import { protectRoute } from '../middleware/auth.middleware.js'

const router = express.Router()

router.post("/signup", signup)
router.post("/login", login)
router.patch("/currency", protectRoute, updateCurrency)

export default router
