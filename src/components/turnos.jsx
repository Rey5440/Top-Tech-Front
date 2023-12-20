import React from 'react';
import Calendar from './calendar';

const Turnos = () => {
  return (
    <div>
      <select id="servicio" name="servicio" defaultValue="Seleccione un servicio">
        <option value="Seleccione un servicio" disabled>
          Seleccione un servicio
        </option>
        <option value="corte">
          corte
        </option>
        {/* Aquí puedes agregar más opciones de servicios si es necesario */}
      </select>
    </div>
  );
};

export default Turnos;
