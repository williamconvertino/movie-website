import { UserAuth } from '@components/context/AuthContext';

export default function TopBar ({showLogin = true}) {
    
    const {user, profile, emailSignUp, emailSignIn, logOut} = UserAuth()

    return (
        <div>
            
            <div className="title">
                <a href="/home">PopcornPulse (home)</a>
            </div>
            
            <div className="title">
                <a href="/search"> Search for movies</a>
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
                            <p>
                                <a href="/login">Login</a>
                            </p>
        
                            <p>
                                <a href="/signup">Sign Up</a>
                            </p>
                        </div>
                    }
                </>
            )}
        </div>
    )
}