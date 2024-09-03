import mongoose from "mongoose";
require("dotenv")

let isConnected = false;

export const connectDB = async () => {
    mongoose.set("strictQuery", true)

    if (isConnected) {
        console.log("DB is already connected")
    }

    try {
        await mongoose.connect(process.env.MONGO_DB_URI, {
            dbName: "AUTH",
            UseNewUrlParser: true,
            useUnifiedTopology: true,
        })
        isConnected = true
        console.log("MongoDB Connected")
    }
    catch (e) {
        console.log(e)
    }
}