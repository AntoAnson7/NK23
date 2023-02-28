import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyBtlftnIMNCUHPUWy2rZoWFTLOA9nbFzBU",
  authDomain: "nk23-a5689.firebaseapp.com",
  projectId: "nk23-a5689",
  storageBucket: "nk23-a5689.appspot.com",
  messagingSenderId: "1045640053442",
  appId: "1:1045640053442:web:df1fadacfa5459a643315b"
};

const app = initializeApp(firebaseConfig);

// GOOGLE AUTHENTICATION
export const auth=getAuth(app)
export const provider=new GoogleAuthProvider()

// DATABASE
export const db=getFirestore(app)

// STORAGE
export const storage=getStorage(app)