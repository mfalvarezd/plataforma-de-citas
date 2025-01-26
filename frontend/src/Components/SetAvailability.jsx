// src/Components/SetAvailability.jsx
import React, { useState } from 'react';
import Calendar from './Calendar';


const SetAvailability = () => {
  // Estado para gestionar la disponibilidad del formulario
  const [availability, setAvailability] = useState({
    day: '',
    startTime: '',
    endTime: '',
  });

  // Estado para gestionar los eventos del calendario
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Disponibilidad Inicial",
      start: "2025-01-24 09:00",
      end: "2025-01-24 17:00",
      description: "Horario de trabajo",
    },
  ]);

  const handleChange = (e) => {
    setAvailability({
      ...availability,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí realizarías una llamada a la API para guardar la disponibilidad
    console.log('Disponibilidad Configurada:', availability);
    console.log('Eventos del Calendario:', events);
    // Resetear el formulario
    setAvailability({ day: '', startTime: '', endTime: '' });
    alert('Disponibilidad y eventos guardados exitosamente!');
  };

  return (
    <div className="set-availability-container">
      <h2>Configurar Disponibilidad</h2>
      <form onSubmit={handleSubmit} className="availability-form">
        <div className="form-group">
          <label>Día:</label>
          <select name="day" value={availability.day} onChange={handleChange} required>
            <option value="">Selecciona un día</option>
            <option value="lunes">Lunes</option>
            <option value="martes">Martes</option>
            <option value="miércoles">Miércoles</option>
            <option value="jueves">Jueves</option>
            <option value="viernes">Viernes</option>
            <option value="sábado">Sábado</option>
            <option value="domingo">Domingo</option>
          </select>
        </div>
        <div className="form-group">
          <label>Hora de Inicio:</label>
          <input 
            type="time" 
            name="startTime" 
            value={availability.startTime} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Hora de Fin:</label>
          <input 
            type="time" 
            name="endTime" 
            value={availability.endTime} 
            onChange={handleChange} 
            required 
          />
        </div>
        <button type="submit" className="submit-button">Guardar Disponibilidad</button>
      </form>

      {/* Integración del Calendario */}
      <div className="calendar-container">
        <h3>Calendario de Disponibilidad</h3>
        <Calendar events={events} setEvents={setEvents} />
      </div>
    </div>
  );
};

export default SetAvailability;
