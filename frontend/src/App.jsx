import React, {useState} from 'react';
import './App.css';
import Login from './Components/Login';

const App = () => {
  // Estado para determinar si estamos mostrando el login o el contenido original
  const [showLogin, setShowLogin] = useState(false);

  const toggleLogin = () => {
    setShowLogin(!showLogin); // Cambia el estado al hacer click
  };
  return (
    <div>
      {/* Header con Navbar y botones */}
      <header className="header">
        <div className="header-container">
          {/* Logo */}
          <div className="logo">
            <h2>MiLogo</h2>
          </div>

          {/* Navbar */}
          <nav className="navbar">
            <ul>
              <li>
                <a href="#home">Inicio</a>
              </li>
              <li>
                <a href="#about">Sobre nosotros</a>
              </li>
              <li>
                <a href="#services">Servicios</a>
              </li>
              <li>
                <a href="#contact">Contacto</a>
              </li>
            </ul>
          </nav>
          
          {/* Botones Login y Sign Up */}
          <div className="auth-buttons"> 
            <button className="login-button" onClick={toggleLogin}>
              {showLogin ? 'Inicio' : 'Login'}
            </button>
            
            {!showLogin && (
              <button className="signup-button">Sign Up</button>
            )}
          </div>
        </div>
      </header>

      {/* Body */}
      <main>
        {showLogin ? (
          <Login />
        ) : (
          <div>
            <h1>Bienvenido a nuestra plataforma</h1>
            <p>Contenido principal de la página</p>
          </div>
        )}
        <button className="cta-button">Llamada a la acción</button>
      </main>

      {/* Footer */}
      <footer>
        <p>&copy; 2025 Scheduler</p>
        <p>Contacto: info@scheduler.com</p>
      </footer>
    </div>
  );
};

export default App;
