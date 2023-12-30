import './App.css'
import { Routes, Route } from 'react-router-dom'; // Asumiendo que estás utilizando react-router-dom
import Home from './components/home/home';
import Turns from './components/turn/turns';
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import Worker from './components/worker/worker';
import Nav from './components/nav/nav';
const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;


function App() {
  const [userData, setUserData] = useState(false);

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
            `${VITE_BACKEND_URL}/users/create`,
            sendUser
          );
          if (response.data) {
            setUserData(response.data);
          }
        } catch (error) {
          console.log(error);
        }
      }
    };
    postUser(user);
  }, [user]);

  return (
    <div>
      <Nav/>
      <Routes>
        <Route path="/" element={<Home user={userData}/>} />
        <Route path="/turnos" element={<Turns/>} />
        <Route path="/worker" element={<Worker user={userData} />} />
      </Routes>
    </div>
  )
}

export default App


