import dotenv from "dotenv";
import { ConnectDb } from "./DbConfig.js";
import App from "./App.js";
dotenv.config(); // 👈 MUST be at the top


// Init Db 
ConnectDb()

// Start the server 
App.listen(3000,()=>{
    console.log('App is running on port',3000)
})