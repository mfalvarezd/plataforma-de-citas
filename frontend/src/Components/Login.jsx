import React from 'react';
import Login from '@react-login-page/page11';
import LoginBannerBgImg from '../img/meeting.png';

const Demo = () => (
  <Login style={{ height: 380 }}>
    <Login.Banner>
      <img src={LoginBannerBgImg} alt="banner" />
    </Login.Banner>
  </Login>
);

export default Demo;
