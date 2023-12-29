import { useState } from "react";
import CustomCalendar from "../customCalendar/customCalendar";
import "./hola.css";
import SelectedDay from "../selectedDay/selectedDay";

const CreateWorkDays = () => {
  const [dayIsSelected, setDayIsSelected] = useState({});
  return (
    <div>
      <CustomCalendar setDayIsSelected={setDayIsSelected} amountOfDays={12} dayIsSelected={dayIsSelected} />
      <SelectedDay/>
    </div>
  );
};

export default CreateWorkDays;