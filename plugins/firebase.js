import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAvWYnffxtbxFp3LLVbnHAvrT_oHQYaoJM",
    authDomain: "onlineassessment-3c952.firebaseapp.com",
    databaseURL: "https://onlineassessment-3c952.firebaseio.com",
    projectId: "onlineassessment-3c952",
    storageBucket: "onlineassessment-3c952.appspot.com",
    messagingSenderId: "136801670597",
    appId: "1:136801670597:web:f712f1b4a45312214a67ac",
    measurementId: "G-GMLCWC79KG"
  };
  const db = !firebase.apps.length ? firebase.initializeApp(firebaseConfig).firestore() : firebase.app().firestore();
  
  //db.settings({timestampsInSnapshots:true});
  export default db;
  // export default !firebase.apps.length 
  // ? firebase.initializeApp(firebaseConfig).firestore()
  // : firebase.app().firestore(); 