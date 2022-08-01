import express from "express"
import cors from "cors"
import coursesRouter from "./api/routes/courses.route.js"
import usersRouter from "./api/routes/users.route.js"

const app = express()

app.use(cors())
app.use(express.json())
app.use("/api/v1/", coursesRouter)
app.use("/api/v1/", usersRouter)
app.use("*", (req, res) => res.status(404).json({error: "not found"}))

export default app
