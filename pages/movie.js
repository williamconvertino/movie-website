import React, {
  useEffect,
  useState,
} from 'react';

import { useRouter } from 'next/router';

import { UserAuth } from '@components/context/AuthContext';
import TopBar from '@components/TopBar';

const Movie = () => {

  const {user, signUp, emailSignIn, logOut} = UserAuth()
  const router = useRouter();

  const [movie, setMovie] = useState(null);
  
  useEffect(() => {
    
  }, [])

  return (
    <div className="signup-page">
      <TopBar showLogin={false}/>
      
    </div>
  );
};

export default SignupPage;
