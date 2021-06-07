import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';

var firebaseConfig = {
    apiKey: "AIzaSyCZjWk50AeuqmCrxDhhnADw8rVeSL6Uo60",
    authDomain: "shout-outs-lab.firebaseapp.com",
    projectId: "shout-outs-lab",
    storageBucket: "shout-outs-lab.appspot.com",
    messagingSenderId: "288614447475",
    appId: "1:288614447475:web:595ece5fa5630cbfc1ad06",
    measurementId: "G-LS2576MHS6"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export const authProvider = new firebase.auth.GoogleAuthProvider();

  export function signInWithGoogle():void{
      firebase.auth().signInWithPopup(authProvider);
  }
  export function signOut():void{
      firebase.auth().signOut();
  }

  export default firebase;
