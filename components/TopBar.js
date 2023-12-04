import React, {
  useEffect,
  useState,
} from 'react';

import { UserAuth } from '@components/context/AuthContext';

export default function TopBar ({showLogin = true}) {
    const {user, profile, emailSignUp, emailSignIn, logOut} = UserAuth()

    const [admin, setAdmin] = useState(false)

    useEffect(() => {
        if (!profile) return;
        if (profile.admin) {
            setAdmin(true)
        }
    }, [profile])

    return (
        <div>
            <div className="title">
                <a href="/home">PopcornPulse</a>
            </div>
            
            {user ? (
                <>
                    <div className = "buttons">
                        {admin && <a href='/reports'>Reported Posts</a>}
                        <a href="/addmovie">Add Movie</a>
                        <a href="/search">Movie Search</a>
                        {/* <a href="/usersearch">User Search</a> */}
                        <a href="/profile">Profile</a>
                        <p>Logged in as {profile ? profile.username : 'loading...'}</p>
                        <p><button onClick={() => logOut()}>Logout</button></p>
                    </div>
                </>
            ) : (
                <>
                    {showLogin &&
                        <div className="buttons">
                            <a href="/login">Login</a>
                            <a href="/signup">Sign Up</a>
                        </div>
                    }
                </>
            )}
        </div>
    )
}