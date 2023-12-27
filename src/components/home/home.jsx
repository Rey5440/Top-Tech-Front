import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Footer from "../footer/footer";
import "./home.css";
import axios from "axios";

const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Home = ({ user }) => {

  console.log(user);
  return (
    <div>
      {user.worker && (
        <NavLink to="/worker">
          <button>admin worker</button>
        </NavLink>
      )}
      <NavLink to="/turns">
        <button>reserva tu turno</button>
      </NavLink>

      <Footer />
    </div>
  );
};
export default Home;
