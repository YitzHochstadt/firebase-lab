import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/authContext';
import { signInWithGoogle } from '../firebaseConfig';
import ShoutOut from '../model/ShoutOut';
import { allShoutOuts, newShoutOut } from '../service/ShoutOutService';
import Header from './Header';
import ShoutOutBlock from './ShoutOutBlock';
import ShoutOutForm from './ShoutOutForm';
import './ShoutOutMain.css';

function ShoutOutMain(){
    const [shoutOuts, setShoutOuts] = useState<ShoutOut[]>([]);
    const [ shoutOutsLoaded, setShoutOutsLoaded ] = useState(false);

    const {user} = useContext(AuthContext);

    useEffect(() => {
        loadShoutOuts();
    }, []);

    function loadShoutOuts(){
        allShoutOuts().then(shoutOutsFromApi => {
            setShoutOuts(shoutOutsFromApi);
            setShoutOutsLoaded(true);
        });
    }

    function handleAddShoutOut(shoutOut: ShoutOut):void{
        newShoutOut(shoutOut).then(loadShoutOuts);
    }

    return(
        <div className="ShoutOutMain">
            <Header/>
            <h2>All Shout Outs</h2>
            { !shoutOutsLoaded ?
            <p className="StudentList__message">Loading...</p>
            : shoutOuts.map(eachShoutOut => 
            <ShoutOutBlock key={eachShoutOut._id} shoutOut={eachShoutOut}/>
            )}
            <h2 className="ShoutOutMain_add">Add a Shout Out</h2>
            { user ?
            <ShoutOutForm onSubmit={handleAddShoutOut}/>
            : <p className="ShoutOutMain_signIn">Sign in to leave a shout out
            <button className="ShoutOutMain_button" onClick={signInWithGoogle}>Sign in with Google</button>
            </p> }
        </div>
    );
}

export default ShoutOutMain;