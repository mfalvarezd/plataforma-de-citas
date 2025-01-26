// src/Components/ScheduledServices.jsx
import React, { useEffect, useState } from 'react';
import './ScheduleService.css'; // Opcional: para estilos específicos
import Calendar from './Calendar';

const ScheduledServices = () => {
  const [scheduled, setScheduled] = useState([]);

  useEffect(() => {
    // Aquí realizarías una llamada a la API para obtener los servicios agendados
    // Por ahora, usaremos datos de ejemplo
    const fetchScheduledServices = async () => {
      // Simulación de datos
      const data = [
        {
          id: 1,
          serviceName: 'Diseño de Logo',
          client: 'Juan Pérez',
          date: '2025-02-10',
          time: '10:00',
        },
        {
          id: 2,
          serviceName: 'Desarrollo Web',
          client: 'María López',
          date: '2025-02-12',
          time: '14:00',
        },
      ];
      setScheduled(data);
    };

    fetchScheduledServices();
  }, []);

  const handleCancel = (id) => {
    // Aquí realizarías una llamada a la API para cancelar la cita
    console.log('Cancelar cita con ID:', id);
    // Actualizar el estado eliminando la cita cancelada
    setScheduled(scheduled.filter(service => service.id !== id));
    alert('Cita cancelada exitosamente!');
  };

  return (
    <div>
      <h2>Servicios Agendados</h2>
      {scheduled.length === 0 ? (
        <p>No tienes servicios agendados.</p>
      ) : (
        <table className="scheduled-table">
          <thead>
            <tr>
              <th>Servicio</th>
              <th>Cliente</th>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {scheduled.map(service => (
              <tr key={service.id}>
                <td>{service.serviceName}</td>
                <td>{service.client}</td>
                <td>{service.date}</td>
                <td>{service.time}</td>
                <td>
                  <button 
                    onClick={() => handleCancel(service.id)} 
                    className="cancel-button"
                  >
                    Cancelar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <Calendar scheduled={scheduled} />
    </div>
  );
};

export default ScheduledServices;
