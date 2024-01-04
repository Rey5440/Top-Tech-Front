import { useEffect, useState } from "react";
import getDayOrder from "../../functions/getDayOrder";
import axios from "axios";

const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const PublicAttention = () => {
  const [daysFromBack, setDaysFromBack] = useState([]);
  const [timeForDays, setTimeForDays] = useState({});
  const [amountOfTurns, SetAmountOfTurns] = useState([1]);

  const [showHours, setShowHours] = useState(false);
  const daysOfWeek = ["dom", "lun", "mar", "mie", "jue", "vie", "sab"];
  //   useEffect(() => {
  //     const fetchData = async () => {
  //       try {
  //         const response = await axios.get(
  //           `${VITE_BACKEND_URL}/workdays/byemail`
  //         );
  //         const { data } = response;
  //         setDays(data);
  //       } catch (error) {
  //         console.error("Error al obtener los dias:", error);
  //         alert("Error al obtener los dias");
  //       }
  //     };
  //     fetchData();
  //   }, []);
  const handleSetDays = async (day) => {
    if (daysFromBack.includes(day)) {
      const newArr = daysFromBack.filter((element) => element !== day);
      setDaysFromBack(newArr);

      // try {
      //   const result = await axios.put(
      //     `${VITE_BACKEND_URL}/admin/publicAttention`,
      //     daysFromBack
      //   );
      // } catch (error) {
      //   console.error("Error al actualizar los dias hábiles", error);
      //   alert("Error al actualizar los dias hábiles");
      // }
    } else {
      setDaysFromBack((prevDays) => {
        const updatedDays = [...prevDays, day];
        // Ordenar el array basándose en los números asignados a cada día
        return updatedDays.sort((a, b) => getDayOrder(a) - getDayOrder(b));
      });
    }

    //     try {
    //       const result = await axios.put(
    //         `${VITE_BACKEND_URL}/admin/publicAttention`,
    //         daysFromBack
    //       );
    //     } catch (error) {
    //       console.error("Error al actualizar los dias hábiles", error);
    //       alert("Error al actualizar los dias hábiles");
    //     }
  };

  const handleSetTime = (day) => {
    setTimeForDays((prevTimeForDays) => {
      // Copiar el estado actual para evitar mutaciones directas
      const updatedTimeForDays = { ...prevTimeForDays };

      // Si el día ya está en el estado, eliminarlo
      if (updatedTimeForDays.hasOwnProperty(day)) {
        delete updatedTimeForDays[day];
      } else {
        // Si el día no está en el estado, agregarlo
        updatedTimeForDays[day] = {};
      }

      return updatedTimeForDays;
    });
  };

  const handleNumberOfTurns = (value) => {
    console.log(value);
    console.log(typeof value);

    // Crear un nuevo array con la cantidad de posiciones especificada por value
    const newArray = Array.from(
      { length: parseInt(value, 10) },
      (_, index) => index + 1
    );
    // Actualizar el estado amountOfTurns con el nuevo array
    SetAmountOfTurns(newArray);
    for (const dayProp in timeForDays) {
      if (value == 3) {
        setTimeForDays((prevTimeForDays) => ({
          ...prevTimeForDays,
          [dayProp]: {
            turn1: [],
            turn2: [],
            turn3: [],
          },
        }));
      } else if (value == 2) {
        setTimeForDays((prevTimeForDays) => ({
          ...prevTimeForDays,
          [dayProp]: {
            turn1: [],
            turn2: [],
          },
        }));
      } else {
        setTimeForDays((prevTimeForDays) => ({
          ...prevTimeForDays,
          [dayProp]: {
            turn1: [],
          },
        }));
      }
    }
  };

  const handleSelectTime = (value, name, index) => {
    // index es un Number
    let timeInMinutes;
    if (index == 2 || index == 3) {
      timeInMinutes = Number(value) + 12;
    } else {
      timeInMinutes = Number(value);
    }

    // Crear una copia del estado actual
    const updatedTimeForDays = { ...timeForDays };

    for (const dayProp in updatedTimeForDays) {
      if (name === "minimo") {
        updatedTimeForDays[dayProp][`turn${index}`][0] = timeInMinutes;
      } else {
        updatedTimeForDays[dayProp][`turn${index}`][1] = timeInMinutes;
      }
    }

    // Actualizar el estado con la copia actualizada
    setTimeForDays(updatedTimeForDays);
  };

  console.log(timeForDays);
  return (
    <div>
      {!showHours ? (
        <div>
          <div>
            <h1>dias laborales</h1>
            {daysOfWeek.map((day, index) => {
              return (
                <button
                  key={index}
                  onClick={() => handleSetDays(day)}
                  style={{
                    backgroundColor: daysFromBack.includes(day)
                      ? "blue"
                      : "white",
                  }}
                >
                  {day}
                </button>
              );
            })}
          </div>

          <div>
            <button onClick={() => setShowHours(true)}>Asignar horarios</button>
          </div>
        </div>
      ) : (
        <div>
          <div>
            <button
              onClick={() => {
                setShowHours(false);
                setTimeForDays({});
                SetAmountOfTurns([1]);
              }}
            >
              Atras
            </button>
            <h3>selecciona el time para uno o varios dias</h3>
          </div>
          <div>
            {daysFromBack.map((day, index) => {
              return (
                <button
                  key={index}
                  onClick={() => handleSetTime(day)}
                  style={{
                    backgroundColor: timeForDays.hasOwnProperty(day)
                      ? "blue"
                      : "white",
                  }}
                >
                  {day}
                </button>
              );
            })}
          </div>
          <div>
            <label>cantidad de turnos</label>
            <select onChange={(e) => handleNumberOfTurns(e.target.value)}>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
            </select>
          </div>
          <hr />
        </div>
      )}
      {Object.keys(timeForDays).length > 0 && (
        <div>
          {amountOfTurns.map((amount, index) => {
            return (
              <div key={index}>
                <label htmlFor="">
                  turno {amount} de
                  <select
                    name="minimo"
                    onChange={(e) =>
                      handleSelectTime(e.target.value, e.target.name, index + 1)
                    }
                  >
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                    <option value={6}>6</option>
                    <option value={7}>7</option>
                    <option value={8}>8</option>
                    <option value={9}>9</option>
                    <option value={10}>10</option>
                    <option value={11}>11</option>
                    <option value={12}>12</option>
                  </select>
                </label>
                <label htmlFor="">
                  a
                  <select
                    name="maximo"
                    onChange={(e) =>
                      handleSelectTime(e.target.value, e.target.name, index + 1)
                    }
                  >
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                    <option value={6}>6</option>
                    <option value={7}>7</option>
                    <option value={8}>8</option>
                    <option value={9}>9</option>
                    <option value={10}>10</option>
                    <option value={11}>11</option>
                    <option value={12}>12</option>
                  </select>
                </label>
                <hr />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
export default PublicAttention;
