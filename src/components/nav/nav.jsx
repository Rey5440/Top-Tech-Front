import { NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../login/login";
import LogoutButton from "../logout/logout";
import Profile from "../userProfile/userProfile";
import toHome from "../../assets/home.png";
import "./nav.css";

const Nav = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <div className="div_container_nav">
      <div>
        <NavLink to="/">
          <img src={toHome} alt="inicio" width={"50px"} />
        </NavLink>
      </div>
      <div className="div_subContainer_nav">
        {isAuthenticated ? <LogoutButton /> : <LoginButton />}
        <Profile />
      </div>
    </div>
  );
};
export default Nav;
