import mongoose from "mongoose";

function connectDB(databaseAcess){
    return mongoose
       .connect(databaseAcess)
       .then(() => console.log("Connected to the database"))
       .catch((err) => console.log("Something went wrong! ", err));
}

export default connectDB