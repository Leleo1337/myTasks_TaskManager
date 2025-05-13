import express from "express";
import path from "path";
import tasks from "./routes/tasks.js";

const app = express();
const PORT = 3000;

const __dirname = import.meta.dirname;

// middleware
app.use(express.json())

app.use(express.static(path.join(__dirname, "../frontend/public"))); // static assets
app.use('/api/v1/tasks', tasks) // routes

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));