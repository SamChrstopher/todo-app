// Importing the built-in 'http' module to create an HTTP server
import http from "http";
// Importing the connectDB function from the local 'db' file to connect to MongoDB
import { connectDB } from "./db";
// Importing 'dotenv' to load environment variables from a `.env` file into `process.env`
import dotenv from "dotenv";
// Importing the todosRouter function from the 'routes/todos' file to handle /todos routes
import todosRouter from "./routes/todos";

// Calling dotenv.config() will load the contents of the `.env` file into `process.env`
dotenv.config();

// Creating the HTTP server
const server = http.createServer((req, res) => {
  // Checking if the incoming request URL starts with "/todos"
  if(req.url?.startsWith('/todos')){
    // If yes, call the todosRouter to handle this request
    todosRouter(req,res)
  }else{
    // If the URL is anything else, return a 404 Not Found response
    res.writeHead(404, {'Content-Type':'application-json'})
    // Sending a JSON response with message "Not Found"
    res.end(JSON.stringify({message:'Not Found'}))
  }
});

 // Connecting to the MongoDB database using connectDB()
connectDB() .then(() =>
  server.listen(process.env.PORT, () =>
    console.log(`Server running at the port :: ${process.env.PORT}`)
  )
);

