import { log } from "console";
import { app } from "./app.js";

const PORT = 3333;

app.listen({
    host:'0.0.0.0',
    port:PORT
}).then(()=>{
    console.log("HTTP server running");
})