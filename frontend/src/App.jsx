// src/App.jsx
import React, { useState, useEffect } from 'react';
import './App.css';
import Login from './Components/Login';
import Free from './free'
import FreelancerDashboard from './Components/FreelancerDashboard';
import SignUp from './Components/SignUp';
import InfoSections from './Components/InfoSections';
import Services from './Components/Services';
import Contacto from './Components/Contacto'; // Import the Contacto component
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import homeImage from './img/page.png'; // Import the image

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null); // 'freelancer' o 'cliente'
  const [user, setUser] = useState(null); // Almacena el objeto completo del usuario

  useEffect(() => {
    // Recuperar el estado de la sesión desde localStorage
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const storedUserRole = localStorage.getItem('userRole');
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (storedIsLoggedIn && storedUserRole && storedUser) {
      setIsLoggedIn(storedIsLoggedIn);
      setUserRole(storedUserRole);
      setUser(storedUser);
    }
  }, []);

  useEffect(() => {
    // Guardar la última ruta visitada en localStorage
    const currentPath = window.location.pathname;
    localStorage.setItem('lastPath', currentPath);
  }, [window.location.pathname]);

  const handleLogin = (role, userData) => {
    setIsLoggedIn(true);
    setUserRole(role);
    setUser(userData);

    // Guardar el estado de la sesión en localStorage
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userRole', role);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
    setUser(null);

    // Eliminar el estado de la sesión de localStorage
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userRole');
    localStorage.removeItem('user');
    localStorage.removeItem('lastPath');
  };

  const lastPath = localStorage.getItem('lastPath') || '/';

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
                  <Link to="/about">Sobre nosotros</Link>
                </li>
                <li>
                  <Link to="/services">Servicios</Link>
                </li>
                <li>
                  <Link to="/contact">Contacto</Link>
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
                  <button className="signup-button">
                    <Link to="/signup" style={{ textDecoration: 'none', color: 'inherit' }}>Sign Up</Link>
                  </button>
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
              path="/cliente/*" 
              element={
                isLoggedIn && userRole === 'cliente' ? (
                  <Free user={user}/> // Pasar el objeto user como prop
                ) : (
                  <Navigate to="/login" />
                )
              } 
            />
            
            <Route 
              path="/" 
              element={
                isLoggedIn && userRole === 'freelancer' ? (
                  <Navigate to={lastPath} />
                ) : (
                  <div className="home-content">
                    
                    <h1>Bienvenido a nuestra plataforma</h1>
                    <p>Contenido principal de la página</p>
                    <img src={homeImage} alt="Home" className="home-image" /> 
                    
                  </div>
                )
              } 
            />
   
            <Route path="/contact" element={<Contacto />} /> {/* Add Contacto route */}
            <Route path="/signup" element={<SignUp />} />
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
