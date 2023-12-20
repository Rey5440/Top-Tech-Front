import React, { useState, useEffect } from 'react';

const Calendar = () => {
  const [fechasCitas, setFechasCitas] = useState([
    {
      _id: "657b4ea4bb9f4004507241a6",
      date: "11/12/2023",
      hairstylist: "Van Kiff"
    },
    {
      _id: "657d0c9427414351a1de8fc0",
      date: "11/12/2023",
      hairstylist: "John Wick"
    },
    {
      _id: "657d0ca627414351a1de8fc2",
      date: "12/12/2023",
      hairstylist: "John Wick"
    },
    {
      _id: "657d0cc127414351a1de8fc4",
      date: "13/12/2023",
      hairstylist: "John Wick"
    }
  ]);

  return (
    <div>
      <h1>Calendario de Citas</h1>

      {/* Mostrar fechas de citas */}
      <ul>
        {fechasCitas.map((fecha, index) => (
          <li key={index}>{fecha}</li>
        ))}
      </ul>
    </div>
  );
};

export default Calendar;
