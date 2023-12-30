import { NavLink } from "react-router-dom";


const Home = ({ user }) => {

  return (
    <div>
      {user.worker && (
        <NavLink to="/worker">
          <button>admin worker</button>
        </NavLink>
      )}
      <NavLink to="/turnos">
        <button>reserva tu turno</button>
      </NavLink>
    </div>
  );
};
export default Home;