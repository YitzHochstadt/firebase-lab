import ShoutOut from '../model/ShoutOut';
import './ShoutOutBlock.css';

interface Props{
    shoutOut: ShoutOut;
}

function ShoutOutBlock({shoutOut}: Props){
    return(
        <div className="ShoutOutBlock">
            <h3>Shout out to {shoutOut.to}</h3>
            <p className="from">- from {shoutOut.from}</p>
            <p className="ShoutOutBlock_message">{shoutOut.message}</p>
            {!!shoutOut.profilePhoto && <p>
            <img className="ShoutOutBlock_photo" src={shoutOut.profilePhoto} alt="" />
            </p>}
        </div>
    )
}
export default ShoutOutBlock;