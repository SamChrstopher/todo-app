// Importing MongoClient from the 'mongodb' package to interact with MongoDB
import { MongoClient } from "mongodb";
// Importing dotenv to load environment variables from a `.env` file
import dotenv from "dotenv"

// Configuring dotenv to load the environment variables into process.env
dotenv.config()

// Creating a new MongoClient instance using the MONGO_URI environment variable
const client = new MongoClient(process.env.MONGO_URI!)
// Declaring a variable to store the database instance (can be of any type for now)
let db: any;

// This async function connects to the MongoDB database
export async function connectDB() {
    // Wait until the client connects to the MongoDB server
    await client.connect()
    // Set the 'db' variable to reference the 'todo-app' database
    db = client.db('todo-app') 
    // Log a success message once connected
    console.log("MongoDB connected!")    
}

// This function returns the current database instance so it can be used in other files
export function getDB(){
    return db
}