import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyBJZKGOKriSTx3I-oQq91xdeJrXEzotYQU",
    authDomain: "whatsapp-12app.firebaseapp.com",
    projectId: "whatsapp-12app",
    storageBucket: "whatsapp-12app.appspot.com",
    messagingSenderId: "753122318837",
    appId: "1:753122318837:web:afc0c62b25354a418068bc",
    measurementId: "G-S2CRSQKWXK"
  };

  const firebaseApp =firebase.initializeApp(firebaseConfig);

  const db=firebaseApp.firestore();

  const auth=firebase.auth();

  const provider=new firebase.auth.GoogleAuthProvider()

  export {auth,provider};


  export default db;