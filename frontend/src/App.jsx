// src/App.jsx
import React, { useState } from 'react';
import './App.css';
import Login from './Components/Login';
import FreelancerDashboard from './Components/FreelancerDashboard';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null); // 'freelancer' o 'cliente'
  const [user, setUser] = useState(null); // Almacena el objeto completo del usuario

  const handleLogin = (role, userData) => {
    setIsLoggedIn(true);
    setUserRole(role);
    setUser(userData);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
    setUser(null);
  };

  return (
    <Router>
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
                  <Link to="/">Inicio</Link>
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
              {!isLoggedIn ? (
                <>
                  <button className="login-button">
                    <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>Login</Link>
                  </button>
                  <button className="signup-button">Sign Up</button>
                </>
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
                  <FreelancerDashboard user={user} /> // Pasar el objeto user como prop
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
                  <div className="home-content">
                    <h1>Bienvenido a nuestra plataforma</h1>
                    <p>Contenido principal de la página</p>
                    <button className="cta-button">Llamada a la acción</button>
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
