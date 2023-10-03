import React, { useState } from 'react';

import TopBar from '@components/TopBar';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add authentication here
  };

  return (
    <div className="login-page">
      <TopBar showLogin={false}/>
      <form onSubmit={handleSubmit}>
      <p>Login</p>
        <div className="input-group">
          <label>Username:</label>
          <input
            type="username"
            value={username}
            onChange={handleUsernameChange}
            required
            style={{ marginBottom: '15px' }}
          />
        </div>
        <div className="input-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
            style={{ marginBottom: '15px' }}
          />
        </div>
        <div className="submit-button">
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
