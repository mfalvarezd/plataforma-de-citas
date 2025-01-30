// src/Components/FreelancerDashboard.jsx
import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import UploadService from './UploadService';
import SetAvailability from './SetAvailability';
import ScheduledServices from './ScheduleService';
import './FreelancerDashboard.css'; // Importar estilos específicos

const FreelancerDashboard = ({ user }) => { // Recibir el objeto user como prop
  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h3>Dashboard Freelancer</h3>
        <ul>
          <li>
            <Link to="upload-service">Subir Servicio</Link>
          </li>
          <li>
            <Link to="set-availability">Configurar Disponibilidad</Link>
          </li>
          <li>
            <Link to="scheduled-services">Servicios Agendados</Link>
          </li>
        </ul>
      </aside>
      
      <section className="dashboard-content">
        <Routes>
          <Route path="upload-service" element={<UploadService user={user} />} />
          <Route path="set-availability" element={<SetAvailability user={user} />} />
          <Route path="scheduled-services" element={<ScheduledServices user={user} />} />
          <Route path="*" element={<h3>Seleccione una opción del menú</h3>} />
        </Routes>
      </section>
    </div>
  );
};

export default FreelancerDashboard;
