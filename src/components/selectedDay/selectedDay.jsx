import { useEffect, useState } from "react";
import axios from "axios";

const SelectedDay = ({ dayIsSelected }) => {
  const [timeAvailable, setTimeAvailable] = useState(/* como se trae??? */);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${VITE_BACKEND_URL}/workdays/getdays`,
          dayIsSelected.currentDay
        );
        const { data } = response;
        setTimeAvailable(data);
      } catch (error) {
        console.error("Error al obtener los dias:", error);
        alert("Error al obtener los dias");
      }
    };
    fetchData();
  }, []);

  return <div>Time available</div>;
};

export default SelectedDay;
