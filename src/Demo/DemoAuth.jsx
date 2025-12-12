import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const DemoAuth = createContext();

const initAuth = [
  {
    userName: "Nibesh",
    password: "Nibesh",
    id: 101,
  },
];

export const AuthProvider = ({ children }) => {
  const [users, setUsers] = useState(null);
  const [Error, setError] = useState("");
  const navigate = useNavigate();

  const Login = (username, password) => {
    const foundUser = initAuth.find(
      (u) => u.userName === username && u.password === password
    );

    if (foundUser) {
      setUsers(foundUser);
      setError("");
      navigate("/1"); // ← Now it actually works
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <DemoAuth.Provider value={{ users, setUsers, Login, Error }}>
      {children}
    </DemoAuth.Provider>
  );
};

export const useAuth = () => useContext(DemoAuth);
