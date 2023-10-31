import React, { useState } from 'react';

import { useRouter } from 'next/router';

import { UserAuth } from '@components/context/AuthContext';
import TopBar from '@components/TopBar';

const SignupPage = () => {

  const {user, signUp, emailSignIn, logOut} = UserAuth()
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConf, setPasswordConf] = useState('');
  const [error, setError] = useState('');

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password != passwordConf) {
      setError('Passwords do not match');
      setPassword('')
      setPasswordConf('')
      return
    }

    if (checkEmailExists(email)) {
      setError('Account with this email already exists');
      return;
    }

    try {
      await signUp(email, password, username)
      router.push('/home')
    } catch (e) {
      setError('Passwords do not match');
      setPassword('')
      setPasswordConf('')
    }

  };

  //function to check if email exists (will need to be implemented w/ backend)
  const checkEmailExists = (email) => {
    // API backend request
    return false; 
  };

  return (
    <div className="signup-page">
      <TopBar showLogin={false}/>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <h1>Sign Up</h1> 
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
            type="password"
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
