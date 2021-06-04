import { FormEvent, useContext, useState } from 'react';
import { AuthContext } from '../context/authContext';
import ShoutOut from '../model/ShoutOut';
import './ShoutOutForm.css';

interface Props{
    onSubmit: (shoutOut: ShoutOut) => void;
}

function ShoutOutForm({onSubmit}: Props){
    const [to, setTo] = useState("");
    const [message, setMessage] = useState("");

    const {user} = useContext(AuthContext);

    function handleSubmit(e:FormEvent):void{
        e.preventDefault();
        const shoutOut: ShoutOut = {
            to: to,
            from: user?.displayName,
            message: message
        }
        onSubmit(shoutOut);

        setTo("");
        setMessage("");
    }

    return(
        <form className="ShoutOutForm" onSubmit={handleSubmit}>
            <p>
                <label htmlFor="ShoutOutForm_to">To</label>
                <input id="ShoutOutForm_to" value={to} onChange={e => setTo(e.target.value)} required />
            </p>
            <p>From</p>
            <p>
                {user && <div>- {user.displayName}</div>}
            </p>
            <p>
                <label htmlFor="ShoutOutForm_message">Message</label>
                <textarea id="ShoutOutForm_message" value={message} onChange={e => setMessage(e.target.value)} required></textarea>
            </p>
            <p>
        <button type="submit">Shout It!</button>
            </p>
        </form>
    )
}
export default ShoutOutForm;