import { useState } from "react";
import daysMonthCalendarCustom from "../../functions/daysMonthCalendarCustom";
import { useAuth0 } from "@auth0/auth0-react";
import getToday from "../../functions/getToday";
import "./customCalendar.css";

const CustomCalendar = ({ setDayIsSelected, amountOfDays, dayIsSelected, days, setDays }) => {
  const daysCalendarCustom = daysMonthCalendarCustom(amountOfDays, false); // devuelve...
  // {mont1: [ 31 ], mont2:1, [1, 2, 3, 4, 5, 6, 7, 8, 9], currentMonth: 12, nextMonth: 1}
  let { currentMonth, nextMonth } = daysCalendarCustom;
  const daysOfWeek = ["lun", "mar", "mie", "jue", "vie", "sab", "dom"];
  const getDayPosition = getToday() + 1; // devuelve número que representa qué día de la semana es (lunes, martes, etc)
console.log(days)
  const handleDay = (day, colorDay) => {
    /* setDayIsSelected(prevDays => {  // prevDays representa lo que contiene el estado local
      const updatedDays = { ...prevDays };  // crea una copia de lo que contenia antes de agregar un dia
      if (updatedDays[day]) {  // si ya existia un objeto con la clave day la borra
        delete updatedDays[day];
      } else {  // si no existia un objeto con esa clave la agrega
        updatedDays[day] = {        // fijate la jugarreta, crea el objeto para
          colorDay: colorDay,       // luego acceder a la propiedad day
          email: user.email,
        };
      }
      return updatedDays;  // al retornar dentro del set, solo guarda el retorno
    }); */
    console.log("hola")
  };

  return (
    <div>
      <h1>calendario</h1>
      <div className="line7day">
        {daysOfWeek.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      <div className="line7">
        {daysCalendarCustom.month1.map((day, index) => {
          let colorDay = "#e0e0e0d2";
          /* days[currentMonth] && days[currentMonth][day] */
          if (days && days[currentMonth] && days[currentMonth][day]) {
            colorDay = "#5bfd33d0";
          }

          return (
            <button
              key={index}
              className="month1"
              onClick={() => handleDay(day, colorDay)}
              style={{
                gridColumnStart: index === 0 ? getDayPosition : "auto",
                /* ...(index === 0 ? { backgroundColor: "#e0e0e0" } : {}), */
                backgroundColor: colorDay, // Asignar colorDay al backgroundColor
                ...(dayIsSelected[day] ? { backgroundColor: 'blue' } : {}) // si el dia existe en el estado local...
              }}                                                           // cambia el backgraund a azul
            >
              {day}
            </button>
          );
        })}

        {daysCalendarCustom.month2.map((day, index) => {
          let colorDay = "#e0e0e0d2"; // Inicializar colorDay fuera del mapeo
          
          if (days && days[nextMonth] && days[nextMonth][day]) {
            colorDay = "#5bfd33d0";
          }
          if (days && days[nextMonth] && days[nextMonth][day] && days[nextMonth][day].turn){
            colorDay = "#e6b226d0"
          }

          return (
            <button
              key={index + 100}
              className="month2"
              onClick={() => handleDay(day, colorDay)}
              style={{
                backgroundColor: colorDay, // Asignar colorDay al backgroundColor
                ...(dayIsSelected[day] ? { backgroundColor: 'blue' } : {}) // si el dia existe en el estado local..
              }}                                                           // cambia el backgraund a azul
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CustomCalendar;