import React, { useState } from 'react';
import axios from '../api/axios'; // Importar la instancia de axios configurada
import './SignUp.css'; // Importar el archivo CSS

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userType, setUserType] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email !== confirmEmail) {
      alert('Emails do not match');
      return;
    }
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    if (!userType) {
      alert('Please select a user type');
      return;
    }

    try {
      const response = await axios.post('/users', {
        name,
        email,
        password,
        phone,
        role: userType,
      });
      console.log('Form submitted', response.data);
      alert('User registered successfully');
    } catch (error) {
      console.error('There was an error registering the user!', error.response ? error.response.data : error.message);
      alert('There was an error registering the user!');
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-content">
        <form className="signup-form" onSubmit={handleSubmit}>
          <h2>Sign Up</h2>
          <div className="form-group">
            <label>Name:</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Confirm Email:</label>
            <input type="email" value={confirmEmail} onChange={(e) => setConfirmEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Confirm Password:</label>
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Phone:</label>
            <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
          <div className="form-group">
            <label>User Type:</label>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  value="cliente"
                  checked={userType === 'cliente'}
                  onChange={(e) => setUserType(e.target.value)}
                />
                Cliente
              </label>
              <label>
                <input
                  type="radio"
                  value="freelancer"
                  checked={userType === 'freelancer'}
                  onChange={(e) => setUserType(e.target.value)}
                />
                Freelancer
              </label>
            </div>
          </div>
          <button type="submit">Sign Up</button>
        </form>
        <div className="signup-image">
          <img src="src/img/meeting.png" alt="Sign Up" />
        </div>
      </div>
    </div>
  );
};

export default SignUp;