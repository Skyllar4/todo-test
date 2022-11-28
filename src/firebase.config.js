import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyB0DDaCBHURjee8TbViQEqvCyNgi8Cszz8",
  authDomain: "todo-test-fe294.firebaseapp.com",
  projectId: "todo-test-fe294",
  storageBucket: "todo-test-fe294.appspot.com",
  messagingSenderId: "211354973992",
  appId: "1:211354973992:web:d877e6631a73b262ac821d"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// const getData = async () => {
//   return await getDocs(collection(db, "/todos"))
// }

export default db;
