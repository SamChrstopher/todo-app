// Importing necessary types from the 'http' module for creating server and handling requests
import { IncomingMessage, ServerResponse } from "http";

// Importing a custom function to get the MongoDB connection
import { getDB } from "../db";

// Importing ObjectId from the MongoDB library to work with MongoDB IDs
import { ObjectId } from "mongodb";

//Get all todos from the database
export async function getAll(req: IncomingMessage, res: ServerResponse){
    try{
        // Fetch all documents from the 'todos' collection
        const todos = await getDB().collection('todos').find().toArray()
        // Set response header to indicate JSON response
        res.writeHead(200, {'Content-Type':'application-json'})
        // Send back the list of todos as a JSON string
        res.end(JSON.stringify(todos))
    }
    catch(error){
        // If any error occurs, send a 500 status (Internal Server Error)
        res.writeHead(500)
        // Send an error message in JSON format
        res.end(JSON.stringify({message:"Error fetching todos"}))
    }
}

// Get a single todo by its ID
export async function getOne(req: IncomingMessage, res: ServerResponse, id:string){
    try{
        // Fetch a single todo from the 'todos' collection using the provided ID
        const todo = await getDB().collection('todos').findOne({"_id":new (require('mongodb')).ObjectId(id)})
        // If no todo is found with that ID
        if(!todo){
            res.writeHead(404) //Not Found
            return res.end(JSON.stringify({message: "Todos Not Found"}))
        }
        // If todo is found, send it back
        res.writeHead(200,{'Content-Type':'application-json'})
        res.end(JSON.stringify(todo))
    }catch(error){
        // If any error occurs (invalid ID, etc.), send 500 status
        res.writeHead(500)
        res.end(JSON.stringify({message: "Error in fetching todo"}))
    }
}
//Create a new todo in the database
export async function createOne(req: IncomingMessage, res: ServerResponse){
    let body="" // Variable to store incoming request data

    // Listen for incoming chunks of data
    req.on('data',chunk =>(body+=chunk))
    // Once all data is received
    req.on('end', async ()=>{
        try {
            // Parse the received data into a JSON object
            const data = JSON.parse(body)
            // Insert the new todo into the 'todos' collection
            const result = await getDB().collection('todos').insertOne(data)
            // Send back a 201 Created status with the result
            res.writeHead(201,{'Content-Type':'application-json'})
            res.end(JSON.stringify(result))
        } catch (error) {
            // If the data is invalid JSON or insertion fails
            res.writeHead(400) // Bad Request
            res.end(JSON.stringify({message:"Invalid Data"}))
        }
    })
}
//Update an existing todo by its ID
export async function updateOne(req: IncomingMessage, res: ServerResponse, id: string) {
    let body = ""; // Variable to accumulate the incoming request body

    // Collect incoming data chunks
    req.on("data", chunk => (body += chunk));
    // Once the entire body is received
    req.on("end", async () => {
        try {
            // Parse the data into a JSON object
            const data = JSON.parse(body);
            // Update the todo with the given ID, setting its new values
            const result = await getDB().collection("todos").updateOne(
                { _id: new ObjectId(id) }, // filter by ID
                { $set:{"value": data}} // update with new data
            );
            // If no document was matched to update
            if (result.matchedCount === 0) {
                res.writeHead(404); //Not Found
                return res.end(JSON.stringify({ message: "Todo Not Found" }));
            }
            // If updated successfully
            res.writeHead(200, { "Content-Type": "application-json" });
            res.end(JSON.stringify({ message: "Todo Updated", result }));
        } catch (error) {
            // If the body is not valid JSON or ID is wrong
            res.writeHead(400); //Bad Request
            res.end(JSON.stringify({ message: "Invalid Data or ID" }));
        }
    });
}
//Delete a single todo by its ID
export async function deleteOne(req: IncomingMessage, res: ServerResponse, id: string) {
    try {
        // Attempt to delete the todo with the given ID
        const result = await getDB().collection("todos").deleteOne({ _id: new ObjectId(id) });

        // If no document was deleted
        if (result.deletedCount === 0) {
            res.writeHead(404); //Not Found
            return res.end(JSON.stringify({ message: "Todo Not Found" }));
        }
        // If deleted successfully
        res.writeHead(200, { "Content-Type": "application-json" });
        res.end(JSON.stringify({ message: "Todo Deleted" }));
    } catch (error) {
        // If any error occurs
        res.writeHead(500);// Internal Server Error
        res.end(JSON.stringify({ message: "Error Deleting Todo",error:error }));
    }
}

//Delete all todos from the database
export async function deleteAll(req: IncomingMessage, res: ServerResponse) {
    try {
        // Delete all documents in the 'todos' collection
        const result = await getDB().collection("todos").deleteMany({});

        // Send response with count of deleted documents
        res.writeHead(200, { "Content-Type": "application-json" });
        res.end(JSON.stringify({ message: "All Todos Deleted", deletedCount: result.deletedCount }));
    } catch (error) {
        // If something goes wrong during deletion
        res.writeHead(500); //Internal Server Error
        res.end(JSON.stringify({ message: "Error Deleting All Todos" }));
    }
}
