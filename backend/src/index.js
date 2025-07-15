import express from 'express'
import dotenv from "dotenv";
import { connectDB } from './lib/db.js'
import userRoutes from './routes/user.routes.js'

dotenv.config()

const port = process.env.PORT || 5000
const app = express()

app.use(express.json())

app.use("/api/user", userRoutes)

app.listen(5000, () => {
    console.log(`Listening on port ${port}`)
    connectDB()
})