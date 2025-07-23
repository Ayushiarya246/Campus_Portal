import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAIMWEhJCdmBF9w2ppCQz4xP6MfFotPd2M",
  authDomain: "placement-portal-ee2da.firebaseapp.com",
  projectId: "placement-portal-ee2da",
  storageBucket: "placement-portal-ee2da.firebasestorage.app",
  messagingSenderId: "685446955990",
  appId: "1:685446955990:web:3afebfb0fb85aeef3fda77",
  measurementId: "G-H4G9PEQ4F8"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

const db = getFirestore(app);

export { auth, provider, db };