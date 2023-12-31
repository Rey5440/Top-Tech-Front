import { useEffect, useState } from "react";
import CreateWorkDays from "../createWorkDays/createWorkDays";

const Worker = ({ user }) => {

    return (
        <div>
            {user?.worker && (
                <h1>eres worker</h1>,
                <CreateWorkDays user={user}/>
            )}
            {!user?.worker && (
                <h1>no eres worker</h1>
            )}
        </div>
    );
};

export default Worker;
