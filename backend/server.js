import express from 'express'
import path from 'path';

const app = express()
const PORT = 5000

const __dirname = import.meta.dirname

app.use(express.static(path.join(__dirname, '../frontend/public')))

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))