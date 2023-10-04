import { UserAuth } from '@components/context/AuthContext';

export default function TopBar ({showLogin = true}) {
    
    const {user, profile, emailSignUp, emailSignIn, logOut} = UserAuth()

    return (
        <div>
            
            <div className="title">
                <a href="/home">PopcornPulse</a>
            </div>
            
            {user ? (
                <div>
                    Logged in as {profile ? profile.username : 'loading...'}
                    <button onClick={() => logOut()}>Logout</button>
                    <p>
                        <a href="/profile">Go to profile</a>
                    </p>
                </div>
                
            ) : (
                <>
                    {showLogin &&
                        <div className="buttons">
                            <a href="/search">Movie Search</a>
                            <a href="/login">Login</a>
                            <a href="/signup">Sign Up</a>
                        </div>
                    }
                </>
            )}
        </div>
    )
}