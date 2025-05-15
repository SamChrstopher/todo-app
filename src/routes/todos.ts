// Importing IncomingMessage and ServerResponse types from the built-in 'http' module.
import {IncomingMessage, ServerResponse} from 'http'

// Importing all the exported functions from the todosController file (like getAll, getOne, etc.)
import * as controller from "../controller/todosController"

// Exporting a default function named 'todosRouter' which will handle incoming HTTP requests.
export default function todosRouter(req: IncomingMessage , res: ServerResponse){

    // Extracting the HTTP method from the request (GET, POST, PUT, DELETE, etc.)
    const method = req.method

    // Extracting the URL path from the request, removing any undefined values and empty strings.
    // Example: "/todos/123" becomes ['todos', '123']
    const url = req.url?.split('/').filter(Boolean)|| []

    // Handling a GET request to '/todos' => return all todos.
    // Example: GET /todos
    if(method==='GET' && url.length===1){
        return controller.getAll(req,res) 
    }
    // Handling a GET request to '/todos/:id' => return a specific todo by ID.
    // Example: GET /todos/123
    if(method==='GET' && url.length===2){
        return controller.getOne(req,res,url[1]) 
    }
    // Handling a POST request to '/todos' => create a new todo.
    // Example: POST /todos with body data
    if(method==='POST' && url.length===1){
        return controller.createOne(req,res) 
    }
    // Handling a PUT request to '/todos/:id' => update an existing todo by ID.
    // Example: PUT /todos/123 with updated body data
    if(method==='PUT' && url.length===2){
        return controller.updateOne(req,res,url[1]) 
    }
    // Handling a DELETE request to '/todos/:id' => delete a specific todo by ID.
    // Example: DELETE /todos/123
    if(method==='DELETE' && url.length===2){
        return controller.deleteOne(req,res,url[1]) 
    }
    // Handling a DELETE request to '/todos' => delete all todos.
    // Example: DELETE /todos
    if(method==='DELETE' && url.length===1){
        return controller.deleteAll(req,res) 
    }
    // If none of the above conditions match, respond with "Method Not Allowed" (HTTP status 405).
    res.writeHead(405)
    res.end(JSON.stringify({message:"Method Not Allowed"}))
}