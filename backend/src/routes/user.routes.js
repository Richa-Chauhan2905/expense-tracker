import express from 'express'
import { login, logout, signup, updateCurrency, getMe } from '../controller/user.controller.js'
import { protectRoute } from '../middleware/auth.middleware.js'

const router = express.Router()

router.post("/signup", signup)
router.post("/login", login)
router.post("/logout", logout)
router.get("/me", protectRoute, getMe)
router.patch("/currency", protectRoute, updateCurrency)

export default router
