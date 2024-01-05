import { useEffect, useState } from "react";
import Services from "../services/services";
/* import NotFound from "../page_not_found/not_found"; */
import Users from "../users/users";
import PublicAttention from "../publicAttention/publicAttention";
/* import PublicAttention from "../publicAttention/publicAttention"; */

const Admin = ({ user }) => {
  const [isAdmin, setIsAdmin] = useState(1);

  useEffect(() => {
    if (user.admin) {
      setIsAdmin(true);
    } 
  }, [user]);

  return (
    <div>
      {isAdmin === 1 ? null : isAdmin === true ? ( // Puedes mostrar un componente de carga o un mensaje mientras se determina el estado de isAdmin
        <div>
          <h1>Administracion del admin</h1>
          <hr />
          <Services />
          <hr />
          <Users />
          <hr />
          <PublicAttention />
          <hr />
        </div>
      ) : (
        <div>
        <h1>not found</h1>
        {/* <NotFound /> */}
        </div>
      )}
    </div>
  );
};

export default Admin;