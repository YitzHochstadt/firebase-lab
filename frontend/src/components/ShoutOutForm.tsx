import firebase from '../firebaseConfig';
import { FormEvent, useContext, useRef, useState } from 'react';
import { AuthContext } from '../context/authContext';
import ShoutOut from '../model/ShoutOut';
import './ShoutOutForm.css';

interface Props{
    onSubmit: (shoutOut: ShoutOut) => void;
}

function ShoutOutForm({onSubmit}: Props){
    const [to, setTo] = useState("");
    const [message, setMessage] = useState("");
    const photoInputRef = useRef<HTMLInputElement>(null);
    const formRef = useRef<HTMLFormElement>(null);

    const {user} = useContext(AuthContext);

    function handleSubmit(e:FormEvent):void{
        e.preventDefault();
        const shoutOut: ShoutOut = {
            to: to,
            from: user?.displayName,
            message: message
        }
    const files = photoInputRef.current?.files;
    if (files && files[0]) {
      const photoFile = files[0];
      console.log(photoFile);

      const rootFolder = firebase.storage().ref();
      const profilePhotosFolder = rootFolder.child("profile-photos");
      // First upload the file
      profilePhotosFolder.child(photoFile.name).put(photoFile).then(snapshot => {
        snapshot.ref.getDownloadURL().then(url => {
          // Then save the student
          shoutOut.profilePhoto = url;
          onSubmit(shoutOut);
          clearForm();
        });
      });
    } else {
      onSubmit(shoutOut);
      clearForm();
    }
  function clearForm() {
    setTo("");
    setMessage("");
    formRef.current?.reset();
    }
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
                <label htmlFor="ShoutOutForm_photo">Profile Photo</label>
                <input id="ShoutOutForm_photo" type="file" ref={photoInputRef} />
            </p>
            <p>
                <button type="submit">Shout It!</button>
            </p>
        </form>
    )
}
export default ShoutOutForm;