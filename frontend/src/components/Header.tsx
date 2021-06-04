import { useContext } from 'react';
import { AuthContext } from '../context/authContext';
import { signInWithGoogle, signOut } from '../firebaseConfig';
import './Header.css';

function Header(){
    const {user} = useContext(AuthContext);
    console.log(user);

    return(
        <header className="Header">
            <h1>Shout It Out!</h1>
            {user ? <div>
                <p className="Header_welcome">Welcome {user.displayName}!</p>
            <button onClick={signOut}>Sign out</button>
            </div>
            : <button onClick={signInWithGoogle}>Sign in with Google</button>}
        </header>
    );
}
export default Header;