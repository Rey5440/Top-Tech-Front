import { useEffect, useState } from "react";

const Worker = ({ user }) => {
    console.log(user);

    return (
        <div>
            {user?.worker && (
                <h1>eres worker</h1>
            )}
            {!user?.worker && (
                <h1>no eres worker</h1>
            )}
        </div>
    );
};

export default Worker;
