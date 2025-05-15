//EventLoopMechanism

//Synchronous function
function First(){
 Second()
//  console.log("First function is being called")
}
function Second(){
    console.log("console function is called")
}
First()
//First function is added to the callstack
//second function is called inside first and added to the stack
//Console log is also added to the stack
//It follows Last in first out (LIFO)


//Asynchronous functions
console.log("Number 1")
setTimeout(()=>{
    console.log("Number 2")
},0)
console.log("Number 3")

//Step 1: 
//console log 1 is being called 
//Javascript recognizes it as a synchronous function
//It is goes to the callstack and immediately executes

//Step 2:
//SetTimeout is being called 
//Javscript recognizes it as a asynchronous function
//SetTimeout is added to the stack
//The callback ()=>console.log("Number 2") is offloaded to the node API
//Timer 0ms is being set 
//After 0ms, callback is placed into the callback queue

//Step 3:
//Console log 3 is being called
//Javascript recognizes the synchronous functions
//It goes to the callstack and executes immediately

//Step 4: Event Loop
//a) Checks if the callstack is empty
//b) Picks up the callback console log 2 from the callback queue 
//c) Executes the console log 2 immediately

//Examples:
//Synchronous dependent, 
//synchronous independent, 
//synchronous with asynchronous dependent,
//Synchronous with asynchronous independent

//event loops, advanced hooks (useContext,..), Componenet api lifecycle, prototype chaining, side effects,
//garbage collection, prototypal inheritance in function components. css: z-index, media queries, responsiveness, 
//Node js, next js - event loop mechanism
//Http requests- 100,..