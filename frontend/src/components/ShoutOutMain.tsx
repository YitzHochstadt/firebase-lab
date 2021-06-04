import { useEffect, useState } from 'react';
import ShoutOut from '../model/ShoutOut';
import { allShoutOuts, newShoutOut } from '../service/ShoutOutService';
import ShoutOutBlock from './ShoutOutBlock';
import ShoutOutForm from './ShoutOutForm';
import './ShoutOutMain.css';

function ShoutOutMain(){
    const [shoutOuts, setShoutOuts] = useState<ShoutOut[]>([]);

    useEffect(() => {
        loadShoutOuts();
    }, []);

    function loadShoutOuts(){
        allShoutOuts().then(shoutOutsFromApi => {
            setShoutOuts(shoutOutsFromApi);
        });
    }

    function handleAddShoutOut(shoutOut: ShoutOut):void{
        newShoutOut(shoutOut).then(loadShoutOuts);
    }

    return(
        <div className="ShoutOutMain">
            <h2>All Shout Outs</h2>
            {shoutOuts.map(eachShoutOut => 
                <ShoutOutBlock key={eachShoutOut._id} shoutOut={eachShoutOut}/>
            )}
            <h2>Add a Shout Out</h2>
            <ShoutOutForm onSubmit={handleAddShoutOut}/>
        </div>
    );
}

export default ShoutOutMain;