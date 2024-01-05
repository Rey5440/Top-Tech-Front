import { useEffect, useState } from "react";
import axios from "axios";

const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Users = () => {
    const [allUsers, setAllUsers] = useState([]);
    const [add, setAdd] = useState(false)
    
    const handleUpdateUser = async (email) => {

        try{
            const response = await axios.put(`${VITE_BACKEND_URL}/users/update`, {email});
            setAdd(!add)
        } catch {
            console.error("Error al updatear usuario", error);
        }
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${VITE_BACKEND_URL}/users/all`);
                const { data } = response;
                setAllUsers(data);
            } catch (error) {
                console.error("Error al obtener los usuarios", error);
                alert("Error al obtener los usuarios");
            }
        };
        fetchData();
    }, [add]);


    return (
        <div>
            <div>
                <h2>clientes</h2>
                {allUsers.map((user, index) => (
                    (allUsers.length > 0 && user && user.worker == false && 
                        <div key={index}>
                        <h4>Nombre: {user.name}</h4>
                        <h4>Email: {user.email}</h4>
                        <button onClick={() => handleUpdateUser(user.email)}>agregar a workers</button>
                        <button>eliminar</button>
                    </div>)
                ))}
            </div>
            <div>
                <h2>workers</h2>
                {allUsers.map((user, index) => (
                    (allUsers.length > 0 && user && user.worker == true && 
                    <div key={index}>
                    <h4>Nombre: {user.name}</h4>
                    <h4>Email: {user.email}</h4>
                    <button onClick={() => handleUpdateUser(user.email)}>quitar de workers</button>
                    <button>eliminar</button>
                </div>)
                ))}
            </div>
        </div>
    );
};

export default Users;
