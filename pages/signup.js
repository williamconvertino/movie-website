import React, { useState } from 'react';

import TopBar from '@components/TopBar';

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConf, setPasswordConf] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handlePasswordConfChange = (e) => {
    setPasswordConf(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add authentication here
  };

  return (
    <div className="signup-page">
      <TopBar showLogin={false}/>
      <form onSubmit={handleSubmit}>
        <p>Sign Up</p> 
        <div className="input-container">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            required
            style={{ marginBottom: '15px' }}
          />
        </div>
        <div className="input-container">
          <label>Username:</label>
          <input
            type="username"
            value={username}
            onChange={handleUsernameChange}
            required
            style={{ marginBottom: '15px' }}
          />
        </div>
        <div className="input-container">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
            style={{ marginBottom: '15px' }}
          />
        </div>
        <div className="input-container">
          <label>Confirm Password:</label>
          <input
            type="passwordConf"
            value={passwordConf}
            onChange={handlePasswordConfChange}
            required
            style={{ marginBottom: '15px' }}
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignupPage;
