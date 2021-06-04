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
            <p>{shoutOut.message}</p>
        </div>
    )
}
export default ShoutOutBlock;