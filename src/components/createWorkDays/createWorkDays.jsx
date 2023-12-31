import { useEffect, useState } from "react";
import CustomCalendar from "../customCalendar/customCalendar";
import axios from "axios";
const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const CreateWorkDays = ({ user }) => {
    const [dayIsSelected, setDayIsSelected] = useState({});
    const [days, setDays] = useState({})
    console.log(days)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post(
                    `${VITE_BACKEND_URL}/workdays/byemail`,{email: user.email}
                );
                const { data } = response;
                setDays(data);
            } catch (error) {
                console.error("Error al obtener los dias:", error);
                alert("Error al obtener los dias");
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <CustomCalendar
      setDayIsSelected={setDayIsSelected}
        amountOfDays={12} 
        dayIsSelected={dayIsSelected}
        days={days}
        setDays={setDays} />
            {/* <SelectedDay/> */}
        </div>
    );
};

export default CreateWorkDays;