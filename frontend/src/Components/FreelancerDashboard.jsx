// src/Components/FreelancerDashboard.jsx
import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import UploadService from './UploadService';
import SetAvailability from './SetAvailability';
import ScheduledServices from './ScheduleService';
import './FreelancerDashboard.css'; // Importar estilos específicos

const FreelancerDashboard = () => {
  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h3>Dashboard Freelancer</h3>
        <ul>
          <li>
            <Link to="/freelancer/upload-service">Subir Servicio</Link>
          </li>
          <li>
            <Link to="/freelancer/set-availability">Configurar Disponibilidad</Link>
          </li>
          <li>
            <Link to="/freelancer/scheduled-services">Servicios Agendados</Link>
          </li>
        </ul>
      </aside>
      
      <section className="dashboard-content">
        <Routes>
          <Route path="upload-service" element={<UploadService />} />
          <Route path="set-availability" element={<SetAvailability />} />
          <Route path="scheduled-services" element={<ScheduledServices />} />
          <Route path="*" element={<h3>Seleccione una opción del menú</h3>} />
        </Routes>
      </section>
    </div>
  );
};

export default FreelancerDashboard;
