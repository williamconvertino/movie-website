import { useState } from 'react';

import { UserAuth } from '@components/context/AuthContext';

export default function TestLogin() {

    const {user, emailSignUp, emailSignIn, logOut} = UserAuth()
    const [loading, setLoading] = useState(true);

    const login = () => {
        emailSignIn("test@duke.edu", "password");
      };
    
      const logout = () => {
        logOut();
      };
    

    return (
        <div>
        {user ? (
            <div>
                <p>Welcome, {user.email}!</p>
                <p>Your ID is {user.uid}</p>
                <button onClick={logout}>Logout</button>
            </div>
        ) : (
            <div>
                <button onClick={login}>Login</button>
            </div>
        )}
        </div>
    )
}
