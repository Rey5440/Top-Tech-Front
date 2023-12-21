import { useEffect, useState } from "react";
import axios from "axios";

const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Services = () => {
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState("");
  const [sendAdd, setSendAdd] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${VITE_BACKEND_URL}/services`);
        const { data } = response;
        setServices(data);
      } catch (error) {
        console.error('Error al obtener los servicios:', error);
        alert('Error al obtener los servicios');
      }
    };
    fetchData();
  }, [sendAdd]);

  const handleAddService = async () => {
    try {
      if (newService !== "") {
        // Verifica si el nuevo servicio no está vacío
        await axios.post(`${VITE_BACKEND_URL}/services/create`, {
          service: newService,
        });

        // Refresca la lista de servicios después de agregar uno nuevo
        setNewService("");
        setSendAdd(!sendAdd);
      }
    } catch (error) {
      console.error('Error al agregar el servicio:', error);
      alert('Error al agregar el servicio');
    }
  };

  const deleteHandler = async (serviceName) => {
    try {
      // Lógica para eliminar el servicio por su nombre
      await axios.delete(`${VITE_BACKEND_URL}/services/delete`, {
        data: { service: serviceName },
      });

      // Refresca la lista de servicios después de eliminar uno
      setSendAdd(!sendAdd);
    } catch (error) {
      console.error('Error al borrar el servicio:', error);
      alert('Error al borrar el servicio');
    }
  };

  return (
    <div>
      <input
        type="text"
        value={newService}
        onChange={(e) => setNewService(e.target.value)}
        placeholder="Nuevo servicio"
      />
      <button onClick={handleAddService}>Agregar servicio</button>
      {services.length > 0 &&
        services.map((element, index) => (
          <div key={index}>
            <h2>{element}</h2>
            <button onClick={() => deleteHandler(element)}>Borrar</button>
          </div>
        ))}
    </div>
  );
};

export default Services;
