import express from "express"
import connectdb from "./database.js"
import userRoutes from "./routes/userRoutes.js"
import feedRoutes from "./routes/feedRoutes.js"
import cors from "cors"

const app = express()
const PORT = 3001

app.use(cors())
app.use(express.json())
connectdb()

app.use("/user", userRoutes)
app.use("/feed", feedRoutes)
app.listen(PORT, ()=>{console.log(`http://localhost:${PORT}`)})