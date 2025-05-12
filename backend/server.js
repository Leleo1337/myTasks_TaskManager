import express from 'express'
import path from 'path';
import { fileURLToPath } from 'url';

const app = express()
const PORT = 5000

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

app.use(express.static(path.join(__dirname, '../frontend/public')))

app.get('/', (req, res) => {
    res.send('Hello world!') 
})

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))