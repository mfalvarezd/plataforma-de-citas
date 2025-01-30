// src/Components/UploadService.jsx
import React, { useState } from 'react';
import api from '../api/axios'; // Importar la instancia de axios configurada
import { useNavigate } from 'react-router-dom';


const UploadService = ({ user }) => { // Recibir el objeto user como prop
  const [service, setService] = useState({
    title: '',
    description: '',
    price: '',
    date: '',
    start_time: '',
    end_time: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setService({
      ...service,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Validar que end_time sea después de start_time
      if (service.end_time <= service.start_time) {
        alert('La hora de fin debe ser después de la hora de inicio.');
        return;
      }

      // Preparar los datos para enviar
      const serviceData = {
        freelancer_id: user.id,
        title: service.title,
        description: service.description,
        price: parseFloat(service.price),
        date: service.date,
        start_time: service.start_time,
        end_time: service.end_time,
      };

      // Realizar la solicitud POST para crear el servicio
      const response = await api.post('/services', serviceData);
      console.log('Servicio creado:', response.data);

      alert('Servicio subido exitosamente!');
      // Resetear el formulario
      setService({ title: '', description: '', price: '', date: '', start_time: '', end_time: '' });

      // Opcional: Redirigir al usuario o actualizar el estado
      navigate('/freelancer/scheduled-services'); // Por ejemplo, redirigir a servicios agendados
    } catch (error) {
      console.error('Error al subir el servicio:', error.response ? error.response.data : error.message);
      alert('Hubo un error al subir el servicio. Verifica los datos e intenta nuevamente.');
    }
  };

  return (
    <div>
      <h2>Subir Nuevo Servicio</h2>
      <form onSubmit={handleSubmit} className="service-form">
        <div className="form-group">
          <label>Título del Servicio:</label>
          <input 
            type="text" 
            name="title" 
            value={service.title} 
            onChange={handleChange} 
            required 
            placeholder="Ej. Diseño de Logo"
          />
        </div>
        <div className="form-group">
          <label>Descripción:</label>
          <textarea 
            name="description" 
            value={service.description} 
            onChange={handleChange} 
            required 
            placeholder="Describe tu servicio..."
          ></textarea>
        </div>
        <div className="form-group">
          <label>Precio (USD):</label>
          <input 
            type="number" 
            name="price" 
            value={service.price} 
            onChange={handleChange} 
            required 
            min="0"
            step="0.01"
            placeholder="Ej. 50.00"
          />
        </div>
        <div className="form-group">
          <label>Fecha:</label>
          <input 
            type="date" 
            name="date" 
            value={service.date} 
            onChange={handleChange} 
            required 
            placeholder="Fecha del servicio"
          />
        </div>
        <div className="form-group">
          <label>Hora de Inicio:</label>
          <input 
            type="time" 
            name="start_time" 
            value={service.start_time} 
            onChange={handleChange} 
            required 
            placeholder="Hora de inicio"
          />
        </div>
        <div className="form-group">
          <label>Hora de Fin:</label>
          <input 
            type="time" 
            name="end_time" 
            value={service.end_time} 
            onChange={handleChange} 
            required 
            placeholder="Hora de fin"
          />
        </div>
        <button type="submit" className="submit-button">Subir Servicio</button>
      </form>
    </div>
  );
};

export default UploadService;

