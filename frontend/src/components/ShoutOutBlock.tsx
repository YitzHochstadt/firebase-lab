import ShoutOut from '../model/ShoutOut';
import './ShoutOutBlock.css';

interface Props{
    shoutOut: ShoutOut;
    onDelete: () => void;
}

function ShoutOutBlock({shoutOut, onDelete}: Props){
    return(
        <div className="ShoutOutBlock">
            <h3>Shout out to {shoutOut.to}</h3>
            <p className="from">- from {shoutOut.from}</p>
            <p className="ShoutOutBlock_message">{shoutOut.message}</p>
            {!!shoutOut.profilePhoto && <p>
            <img className="ShoutOutBlock_photo" src={shoutOut.profilePhoto} alt="" />
            </p>}
            <button onClick={onDelete} className="ShoutOutBlock_delete">You can still take it back!</button>
        </div>
    )
}
export default ShoutOutBlock;