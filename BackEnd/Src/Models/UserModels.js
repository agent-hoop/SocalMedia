
import mongoose from "mongoose";

const User = new mongoose.Schema({
    name:{type:String,require:true,trim:true},
    email:{type:String,require:true},
    password:String


},{timestamps:true})


const UserModels = mongoose.Model("User",User)