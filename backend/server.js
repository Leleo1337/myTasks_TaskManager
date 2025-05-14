import app from "./app.js";
import connectDB from "./db/connect.js";
import dotenv from 'dotenv'
dotenv.config()

const PORT = 3000;

async function start(){
    try {
        await connectDB(process.env.DATABASE_ACCESS)
        app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
    } catch (error) {
        console.log(error)
    }
}

start()