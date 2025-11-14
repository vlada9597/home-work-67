import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGO_URI;

if (!uri) {
    throw new Error("❌ MONGO_URI is missing in .env");
}

const client = new MongoClient(uri);
let db = null;

export async function connectDB() {
    if (db) return db;

    try {
        await client.connect();
        console.log("✅ MongoDB Atlas connected");

        db = client.db("express67");
        return db;
    } catch (err) {
        console.error("❌ DB connection error:", err);
        process.exit(1);
    }
}
