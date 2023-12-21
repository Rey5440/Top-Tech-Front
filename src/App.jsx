import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import Nav from "./components/nav/nav";
import Home from "./components/home/home";
import Profile from "./components/userProfile/userProfile";
import Turns from "./components/turns/turns";
import "./App.css";
import Admin from "./components/admin/admin";

function App() {
  const { user } = useAuth0();
  let sendUser;
  if (user) {
    sendUser = {
      name: user.name,
      email: user.email,
    };
  }

  useEffect(() => {
    const postUser = async () => {
      if (user) {
        try {
          const response = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/users/create`,
            sendUser
          );
        } catch (error) {
          console.log(error);
        }
      }
    };
    postUser(user);
  }, [user]);

  return (
    <div>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/turns" element={<Turns />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </div>
  );
}

export default App;
