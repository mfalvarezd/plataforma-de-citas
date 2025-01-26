// src/Components/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginPage, { Username, Password, Submit, Title, Logo, Banner, Footer } from '@react-login-page/page11';
import LoginLogo from 'react-login-page/logo-rect';
import LoginBannerBgImg from '../img/meeting.png';

const Login = ({ onLogin }) => { // Asegúrate de recibir la prop onLogin
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false); // Estado para visibilidad del password
  const [role, setRole] = useState('freelancer'); // Estado para el rol, por defecto 'freelancer'
  
  const navigate = useNavigate(); // Hook para la navegación

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí deberías autenticar al usuario mediante una llamada a la API
    // Por ahora, simularemos el login pasando el rol seleccionado
    console.log('Iniciar sesión como:', role);
    onLogin(role); // Pasar el rol al componente padre
    
    // Redirigir al dashboard del freelancer si el rol es 'freelancer'
    if (role === 'freelancer') {
      navigate('/freelancer');
    } else {
      // Puedes manejar otros roles aquí si es necesario
      navigate('/');
    }
  };

  return (
    <div style={{ height: 480 }}>
      <LoginPage>
        <Logo>
          <LoginLogo />
        </Logo>
        <Title visible={true}>Iniciar Sesión</Title>
        <Username 
          label="Username" 
          name="userUserName" 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Password 
          label="Password" 
          placeholder="Password" 
          name="userPassword" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          visible={passwordVisible} // Cambiar la visibilidad del password
        />
        
        {/* Agregar Selección de Rol */}
        <div style={{ margin: '20px 0' }}>
          <label>
            <input 
              type="radio" 
              name="role" 
              value="freelancer" 
              checked={role === 'freelancer'} 
              onChange={(e) => setRole(e.target.value)}
            />
            Freelancer
          </label>
          {/* Puedes descomentar estas líneas si en el futuro decides incluir otros roles */}
           <label style={{ marginLeft: '20px' }}>
            <input 
              type="radio" 
              name="role" 
              value="cliente" 
              checked={role === 'cliente'} 
              onChange={(e) => setRole(e.target.value)}
            />
            Cliente
          </label> 
        </div>
        
        <Submit 
          onClick={handleSubmit} // Manejar el submit al hacer clic en el botón
        >
          Iniciar Sesión
        </Submit>
        <Banner>
          <img src={LoginBannerBgImg} alt="banner" />
        </Banner>
        <Footer>
          ¿No eres miembro? <a href="#">Regístrate ahora</a>
        </Footer>
      </LoginPage>
    </div>
  );
};

export default Login;
