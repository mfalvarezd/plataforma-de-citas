// src/Components/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios'; // Importar la instancia de axios configurada
import LoginPage, { Username, Password, Submit, Title, Logo, Banner, Footer } from '@react-login-page/page11';
import LoginLogo from 'react-login-page/logo-rect';
import LoginBannerBgImg from '../img/meeting.png';

const Login = ({ onLogin }) => { // Asegúrate de recibir la prop onLogin
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(true); // Estado para visibilidad del password
  const [role, setRole] = useState('freelancer'); // Estado para el rol, por defecto 'freelancer'
  
  const navigate = useNavigate(); // Hook para la navegación

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Realizar la solicitud de inicio de sesión
      const loginResponse = await axios.post('/login', {
        email: username, 
        password,
      });
      console.log('Login successful', loginResponse.data);

      // Recuperar el usuario por email
      const userResponse = await axios.get(`/users/email/${username}`);
      console.log('User details', userResponse.data);

      // Obtener el rol del usuario desde la respuesta
      const userRole = userResponse.data.role;
      setRole(userRole); // Guardar el rol en el estado

      onLogin(userRole); // Pasar el rol al componente padre

      // Redirigir según el rol del usuario
      if (userRole === 'freelancer') {
        navigate('/freelancer');
      } else {
        navigate('/cliente');
      }
    } catch (error) {
      console.error('There was an error logging in!', error.response ? error.response.data : error.message);
      alert('There was an error logging in!');
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
