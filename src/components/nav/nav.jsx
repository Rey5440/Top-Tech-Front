import { NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../login/login";
import LogoutButton from "../logout/logout";
import Profile from "../userProfile/userProfile";
import toHome from "../../assets/home.png";
import toTurns from "../../assets/calendar.png";
import "./nav.css";

const Nav = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <div className="div_container_nav">
      <NavLink to="/">
        Inicio
        <img src={toHome} alt="inicio" width={"50px"} />
      </NavLink>
      {isAuthenticated ? <LogoutButton /> : <LoginButton />}
      <Profile />
    </div>
  );
};
export default Nav;
