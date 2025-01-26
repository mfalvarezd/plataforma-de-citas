// src/App.jsx
import React, { useState } from 'react';
import './App.css';
import Login from './Components/Login';
import FreelancerDashboard from './Components/FreelancerDashboard';
// Puedes importar otros dashboards en el futuro si lo deseas
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null); // 'freelancer' o 'cliente'

  const handleLogin = (role) => {
    setIsLoggedIn(true);
    setUserRole(role);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
  };

  return (
    <Router>
      <div>
        {/* Header con Navbar y botones */}
        <header className="header">
          <div className="header-container">
            {/* Logo */}
            <div className="logo">
              <h2>Scheduler</h2>
              
            </div>

            {/* Navbar */}
            <nav className="navbar">
              <ul>
                <li>
                  <Link to="/">Inicio</Link>
                </li>
                <li>
                  <Link to="#about">Sobre nosotros</Link>
                </li>
                <li>
                  <Link to="#services">Servicios</Link>
                </li>
                <li>
                  <Link to="#contact">Contacto</Link>
                </li>
              </ul>
            </nav>
            
            {/* Botones Login y Sign Up */}
            <div className="auth-buttons"> 
              {!isLoggedIn ? (
                <button className="login-button">
                  <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>Login</Link>
                </button>
              ) : (
                <>
                  {/* Mostrar Dashboard y Logout */}
                  {userRole === 'freelancer' && (
                    <button className="dashboard-button">
                      <Link to="/freelancer" style={{ textDecoration: 'none', color: 'inherit' }}>Dashboard Freelancer</Link>
                    </button>
                  )}
                  {/* Puedes agregar más botones para otros roles en el futuro */}
                  <button className="logout-button" onClick={handleLogout}>
                    Logout
                  </button>
                </>
              )}
              
              {!isLoggedIn && (
                <button className="signup-button">Sign Up</button>
              )}
            </div>
          </div>
        </header>

        {/* Body con Rutas */}
        <main>
          <Routes>
            <Route 
              path="/login" 
              element={<Login onLogin={handleLogin} />} 
            />
            <Route 
              path="/freelancer/*" 
              element={
                isLoggedIn && userRole === 'freelancer' ? (
                  <FreelancerDashboard />
                ) : (
                  <Navigate to="/login" />
                )
              } 
            />
            <Route 
              path="/" 
              element={
                isLoggedIn && userRole === 'freelancer' ? (
                  <Navigate to="/freelancer" />
                ) : (
                  <div align="center">
                    <h1>Bienvenido a nuestra plataforma</h1>
                    <p>La manera más fácil de agendar citas sin complicaciones.</p>
                    
                    <button className="cta-button">Empieza ahora!</button><br />
                    <img src="/src/img/page.png" alt="prueba" />
                    
                  </div>
                )
              } 
            />
            {/* Ruta catch-all para cualquier ruta no definida */}
            <Route 
              path="*" 
              element={<Navigate to="/" />} 
            />
          </Routes>
        </main>

        {/* Footer */}
        <footer>
          <p>&copy; 2025 Scheduler</p>
          <p>Contacto: info@scheduler.com</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;
