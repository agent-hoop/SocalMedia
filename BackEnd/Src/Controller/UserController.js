import { User } from "../models/UserModels.js";


// To get all the users of the db 

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (!users) return res.status(400).json({ error: 'No user exits' })

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// To create new users 
export const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    if (!user) return res.status(400).json({ error: 'No user exits' })

    res.status(201).json({
      message: "User created successfully",
      user,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// To edit the users

export const EditUser = async (req, res) => {
  try {
    const EditUsers = await User.findByIdAndUpdate(req.params.id, req.body)
    if (!EditUsers) return res.status(400).json({ error: 'No user exits' })

    res.status(200).json({
      message: "User edited Successfully",
      EditUsers
    })
  }
  catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// To del the user 

export const delUser = async (req, res) => {

  try {
    const delUsr = await User.findByIdAndDelete(req.params.id);
    if (!delUsr) return res.status(400).json({ error: 'No user exits' })
    res.status(200).json({
      message: "User Deleted successfully",
      delUsr,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
