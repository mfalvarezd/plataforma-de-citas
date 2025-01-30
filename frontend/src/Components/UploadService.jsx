// src/Components/UploadService.jsx
import React, { useState } from 'react';
import api from '../api/axios'; // Importar la instancia de axios configurada
import { useNavigate } from 'react-router-dom';

const UploadService = ({ user }) => { // Recibir el objeto user como prop
  const [service, setService] = useState({
    title: '',
    description: '',
    price: '',
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
      // Preparar los datos para enviar
      const serviceData = {
        freelancer_id: user.id, // Obtener el ID del freelancer del objeto user
        title: service.title,
        description: service.description,
        price: parseFloat(service.price), // Asegurarse de que el precio sea numérico
      };

      // Realizar la solicitud POST para crear el servicio
      const response = await api.post('/services', serviceData);
      console.log('Servicio creado:', response.data);

      alert('Servicio subido exitosamente!');
      // Resetear el formulario
      setService({ title: '', description: '', price: '' });

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
        <button type="submit" className="submit-button">Subir Servicio</button>
      </form>
    </div>
  );
};

export default UploadService;
