import React, { useState } from 'react';

import { useRouter } from 'next/router';

import { UserAuth } from '@components/context/AuthContext';
import TopBar from '@components/TopBar';

function LoginPage() {
  
  const {user, emailSignUp, emailSignIn, logOut} = UserAuth()
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
      await emailSignIn(username, password) 
      router.push('/home')
    } catch (e) {
      setError('Incorrect Password');
      setPassword('')
    }
 
  };

  return (
    <div className="login-page">
      <TopBar showLogin={false}/>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
      <h1>Login</h1>
        <div className="input-group">
          <label>Email:</label>
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
