import { useState } from "react";
import daysMonthCalendarCustom from "../../functions/daysMonthCalendarCustom";
import getToday from "../../functions/getToday";
import "./customCalendar.css";

const CustomCalendar = ({ setDayIsSelected, amountOfDays, dayIsSelected, days, setDays }) => {
  const daysCalendarCustom = daysMonthCalendarCustom(amountOfDays, false);
  let { currentMonth, nextMonth } = daysCalendarCustom;
  const daysOfWeek = ["lun", "mar", "mie", "jue", "vie", "sab", "dom"];
  const getDayPosition = getToday() + 1;
  const [exist50, setExist50] = useState(false)
  console.log(dayIsSelected)

  const handleDay = (day, month) => {
    if (dayIsSelected[month] && dayIsSelected[month][day]) {
      // Si ya existe en dayIsSelected, lo quitamos
      const { [day]: _, ...rest } = dayIsSelected[month];
      
      setDayIsSelected(prevState => {
        const newState = { ...prevState, [month]: rest };
  
        if (Object.keys(rest).length < 1) {
          delete newState[month];
        }
  
        return newState;
      });
    } else {
      if (days[month] && days[month][day]) {  // Si existe en days, limpiamos la información anterior y asignamos el nuevo valor
        setDayIsSelected({
          [month]: {
            [day]: {}
          }
        })
        setExist50(true);
      } else {  // Si no existe en days ni en dayIsSelected, agregamos el nuevo día al estado local
        if(exist50 == true) {
          setDayIsSelected({
            [month]: {
              [day]: {}
            }
          })
          setExist50(false)
        }
        setDayIsSelected(prevState => ({
          ...prevState,
          [month]: {
            ...prevState[month],
            [day]: {}
          }
        }))
        
      }
    }
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
          if (days && days[currentMonth] && days[currentMonth][day]) {
            colorDay = "#5bfd33d0";
          }
          if (days && days[currentMonth] && days[currentMonth][day] && days[currentMonth][day].turn) {
            colorDay = "#e6b226d0"
          }

          return (
            <button
              key={index}
              className="month1"
              onClick={() => handleDay(day, currentMonth)}
              style={{
                gridColumnStart: index === 0 ? getDayPosition : "auto",
                backgroundColor: colorDay,
                ...(dayIsSelected[currentMonth] &&
                  dayIsSelected[currentMonth][day]
                    ? { backgroundColor: 'blue' }
                    : {})
              }}
            >
              {day}
            </button>
          );
        })}

        {daysCalendarCustom.month2.map((day, index) => {
          let colorDay = "#e0e0e0d2";
          if (days && days[nextMonth] && days[nextMonth][day]) {
            colorDay = "#5bfd33d0";
          }
          if (days && days[nextMonth] && days[nextMonth][day] && days[nextMonth][day].turn) {
            colorDay = "#e6b226d0"
          }

          return (
            <button
              key={index + 100}
              className="month2"
              onClick={() => handleDay(day, nextMonth)}
              style={{
                backgroundColor: colorDay,
                ...(dayIsSelected[nextMonth] &&
                  dayIsSelected[nextMonth][day]            
                    ? { backgroundColor: 'blue' }
                    : {})
              }}
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
