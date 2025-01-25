import React, { useState } from 'react';
import LoginPage, { Username, Password, Submit, Title, Logo, Banner, Footer } from '@react-login-page/page11';
import LoginLogo from 'react-login-page/logo-rect';
import LoginBannerBgImg from '../img/meeting.png';

const styles = { height: 460 };

const Demo = () => {
  const [valor, setValor] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false); // Estado para visibilidad del password

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      // Cambiar la visibilidad del password al presionar Enter
      setPasswordVisible(true);
    }
  };

  const handleSubmit = () => {
    // Cambiar la visibilidad del password al hacer click en "Iniciar Sesión"
    setPasswordVisible(true);
  };

  return (
    <div style={{ height: 480}}>
      <LoginPage>
        <Username 
          label="Username" 
          name="userUserName" 
          onChange={(e) => setValor(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Password 
          label="Password" 
          placeholder="Password" 
          name="userPassword" 
          visible={passwordVisible} // Cambiar la visibilidad del password
        />
        <Submit 
          onClick={handleSubmit} // Cambiar la visibilidad al hacer clic en el botón
          onKeyDown={handleKeyDown}
        >
          Iniciar Sesión
        </Submit>
        <Banner>
          <img src={LoginBannerBgImg} alt="banner" />
        </Banner>
        <Footer>
          Not a member? <a href="#">Sign up now</a>
        </Footer>
        <Title visible={true} />
        <Logo>
          <LoginLogo />
        </Logo>
      </LoginPage>
    </div>
  );
};

export default Demo;
