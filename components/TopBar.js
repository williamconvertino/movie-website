
export default function TopBar ({showLogin = true}) {
    
    return (
        <div>
            
            <div className="title">
                <a href="/home">PopcornPulse (home)</a>
            </div>

            <div className="title">
                <a href="/search"> Search for movies</a>
            </div>
            
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
        </div>
    )
}