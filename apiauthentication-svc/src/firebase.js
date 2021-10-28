import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage' //Para acceder a las imágenes guardadas en frestore

const firebaseConfig = {
  apiKey: "AIzaSyAMyen17BGSLJrSwpzlmvj62tkN_1tcilU",
  authDomain: "crud-bicicletas.firebaseapp.com",
  projectId: "crud-bicicletas",
  storageBucket: "crud-bicicletas.appspot.com",
  messagingSenderId: "634948217937",
  appId: "1:634948217937:web:b47852f8df421f14b51c70"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth()
  const db= firebase.firestore()
  const storage = firebase.storage()

  export {auth, firebase, db, storage}//Se necesita el firebase porque vamos a configurar un provider