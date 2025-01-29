import React from 'react';
import './Contacto.css';

const Contacto = () => {
  return (
    <div className="contact-section">
      <h2>Contacto</h2>
      <p>Puedes contactarnos a través de...</p>
      <form>
        <div className="form-group">
          <label htmlFor="name">Nombre:</label>
          <input type="text" id="name" name="name" required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Correo Electrónico:</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div className="form-group">
          <label htmlFor="message">Mensaje:</label>
          <textarea id="message" name="message" required></textarea>
        </div>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default Contacto;