import axios from "axios";
import { useEffect, useState } from "react";
import CustomCalendarTurns from "../customCalendar/customCalendarTurns";
import SelectedDayTurns from "../selectedDay/selectedDayTurns";

const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Turns = () => {
  const [workDays, setWorkDays] = useState([]);
  const [arrOfServices, setArrOfServices] = useState([]);
  const [dayIsSelected, setDayIsSelected] = useState(false);
  const [daysForCalendar, setDaysForCalendar] = useState({});
  const [workerWithTime, setWorkerWithTime] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${VITE_BACKEND_URL}/workdays/daysByService`
        );
        const { data } = response;
        setWorkDays(data);
      } catch (error) {
        console.error("Error al obtener los servicios:", error);
        alert("Error al obtener los servicios");
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    // pone en un estado local arrOfServices los servicios totales disponibles
    if (workDays.length > 0) {
      const servicesArray = workDays.reduce((accumulator, workday) => {
        const services = Object.keys(workday.services);
        services.forEach((service) => {
          if (!accumulator.includes(service)) {
            accumulator.push(service);
          }
        });
        return accumulator;
      }, []);
      setArrOfServices(servicesArray);
    }
  }, [workDays]);

  const handleSelectService = async (selectedService) => {
    const result = {};

    workDays.forEach((workday) => {
      if (workday.services.hasOwnProperty(selectedService)) {
        const { time, services } = workday;
        const serviceDuration = services[selectedService];
        let noTimeAvailable;

        for (let i = 0; i <= time.length; i++) {
          let isConsecutive;

          if (time[i] === "free") {
            const consecutiveMinutes = Array.from(time).slice(
              i,
              Number(serviceDuration) + i
            );

            // Verificar si todos los minutos en la secuencia son diferentes de "free"
            isConsecutive = consecutiveMinutes.every(
              (minute) => minute === "free"
            );
            if (isConsecutive) {
              const month = workday.month
              const dayOfMonth = workday.day;
              // Verificar si ya existe result[month] y asignar un valor en consecuencia
              result[month] = result[month] || {};
              result[month][dayOfMonth] = "se puede agendar";

              setWorkerWithTime((prevState) => ({
                ...prevState,
                [dayOfMonth]: {
                  ...prevState[dayOfMonth],
                  [workday.name]: [time, serviceDuration],
                },
              }));
              noTimeAvailable = false;
              return;
            } else {
              noTimeAvailable = true;
            }
          }
          if (noTimeAvailable) {
            const month = workday.month;
            const dayOfMonth = workday.day;

            // Verificar si ya existe result[month] y asignar un valor en consecuencia
            result[month] = result[month] || {};

            // Asignar el estado de agendado en consecuencia
            result[month][dayOfMonth] = "no se puede agendar";
          }
        }
      }
    });

    setDayIsSelected((prevState) => ({
      ...prevState,
      currentService: selectedService,
    }));
    setDaysForCalendar(result);
  };

  let justWorkerWithTime = {};
  if (dayIsSelected.currentDay) {
    if (workerWithTime[dayIsSelected.currentDay]) {
      justWorkerWithTime = workerWithTime[dayIsSelected.currentDay];
    }
  }

  return (
    <div>
      <h1>Selecciona un servicio</h1>
      {arrOfServices.map((service, index) => (
        <button key={index} onClick={() => handleSelectService(service)}>
          {service}
        </button>
      ))}
      {Object.keys(daysForCalendar).length > 0 && (
        <CustomCalendarTurns
          daysForCalendar={daysForCalendar}
          setDayIsSelected={setDayIsSelected}
          amountOfDays={20}
        />
      )}
      {Object.keys(justWorkerWithTime).length > 1 && (
        <SelectedDayTurns justWorkerWithTime={justWorkerWithTime} />
      )}
    </div>
  );
};

export default Turns;
