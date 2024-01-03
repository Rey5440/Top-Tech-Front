import { useEffect, useState } from "react";
import Services from "../services/services";
import NotFound from "../page_not_found/not_found";
import Users from "../users/users";
import PublicAttention from "../publicAttention/publicAttention";

const Admin = ({ user }) => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (user.admin) {
      setIsAdmin(true);
    }
  }, [user]);

  return (
    <div>
      {isAdmin === true && isAdmin ? (
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
        <NotFound />
      )}
    </div>
  );
};

export default Admin;
