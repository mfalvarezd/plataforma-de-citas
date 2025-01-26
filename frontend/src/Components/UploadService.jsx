// src/Components/UploadService.jsx
import React, { useState } from 'react';

const UploadService = () => {
  const [service, setService] = useState({
    name: '',
    description: '',
    price: '',
  });

  const handleChange = (e) => {
    setService({
      ...service,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí realizarías una llamada a la API para guardar el servicio
    console.log('Servicio Subido:', service);
    // Resetear el formulario
    setService({ name: '', description: '', price: '' });
    alert('Servicio subido exitosamente!');
  };

  return (
    <div>
      <h2>Subir Nuevo Servicio</h2>
      <form onSubmit={handleSubmit} className="service-form">
        <div className="form-group">
          <label>Nombre del Servicio:</label>
          <input 
            type="text" 
            name="name" 
            value={service.name} 
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
