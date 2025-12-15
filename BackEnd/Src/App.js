import express from "express";
import { getUsers, createUser, EditUser, delUser } from "./Controller/UserController.js";
import { noteRoute } from "./Routs/NoteRouts.js";
const App = express();

App.use(express.json());
App.use('/api/notes', noteRoute)

App.get('/api/users', getUsers)
App.post('/api/adduser', createUser)
App.put('/api/edituser/:id', EditUser)
App.delete('/api/deletuser/:id', delUser)

export default App;
