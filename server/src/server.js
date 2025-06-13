import app from "./app.js";
import connectDB from "./db/connect.js";
import { configDotenv } from "dotenv";

configDotenv();

const PORT = 3000;

async function start() {
   try {
      await connectDB(process.env.DATABASE_ACCESS);
      app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
   } catch (error) {
      console.log(error);
   }
}

start();
