import { UserAuth } from '@components/context/AuthContext';

export default function TopBar ({showLogin = true}) {
    
    const {user, emailSignUp, emailSignIn, logOut} = UserAuth()

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
                    Logged in as {user.email}
                    <button onClick={() => logOut()}>Logout</button>
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