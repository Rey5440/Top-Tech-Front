import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  let newName;
  if (user) {
    const aux = user.name;
    newName = aux.split(" ")[0];
  }

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div>
        <h2>Bienvenido {newName}</h2>
        <img src={user.picture} alt={user.name} width={"60px"} />
      </div>
    )
  );
};

export default Profile;
