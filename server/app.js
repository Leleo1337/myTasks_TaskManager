import express from "express";
import path from "path";
import tasks from "./routes/tasks.js";
import cors from 'cors'

const app = express()
const __dirname = import.meta.dirname;

app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, "../frontend-template/public")));
app.use('/api/v1/tasks', tasks)

export default app