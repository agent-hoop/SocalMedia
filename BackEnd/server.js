const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());

// 1. Connect to DB
async function connectDB() {
  try {
    mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB Connected");
  } catch (err) {
    console.log("MongoDB Error:", err);
  }
}

connectDB(); // fire and forget

// 2. Create Schema + Model
const User = mongoose.model(
  "User",
  new mongoose.Schema({
    name: String,
    age: Number
  })
);
app.get("/",(req,res)=>{
    console.log('This is req data',req)
    res.status(200).send("<h1>Hello</h1>")
})
app.get("/user/:id",(req,res)=>{

})
// 3. Routes
app.post("/add-user", async (req, res) => {
  const newUser = await User.create(req.body);  
  res.send(newUser);
});

app.get("/users", async (req, res) => {
  const users = await User.find();
  res.send(users);
});

app.listen(3000, () => console.log("Server running on port 3000"));
