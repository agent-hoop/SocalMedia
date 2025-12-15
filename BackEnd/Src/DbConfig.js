import mongoose from "mongoose";

export async function ConnectDb() {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log('DataBase connected ')
    } catch (error) {
        console.log('Error connection Dd',error)
        
    }
    
}