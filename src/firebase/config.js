// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore} from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC82PGD9-y3ZAei8le1b6iEQlx0T_ZZ4CE",
  authDomain: "mini-blog-92db3.firebaseapp.com",
  projectId: "mini-blog-92db3",
  storageBucket: "mini-blog-92db3.appspot.com",
  messagingSenderId: "872526896571",
  appId: "1:872526896571:web:c65530a0f460b619b0b89e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

export {db}