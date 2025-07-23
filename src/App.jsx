import React,{useState,useEffect} from 'react'
import './App.css'
import SignIn from './components/SignIn'
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase';
import Dashboard from './Dashboard'; 
import {db} from './firebase'
import { collection, onSnapshot } from "firebase/firestore";
import ApplyForm from './components/ApplyForm';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {

  const[user,setUser]=useState(JSON.parse(localStorage.getItem('user')));
  const [authorized, setAuthorized] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const email = currentUser.email;
        /*if (email.endsWith('@igdtuw.ac.in')) {
          setUser(currentUser);
          setAuthorized(true);
        } else {
          signOut(auth);
          setUser(null);
          setAuthorized(false);
          alert('Only @igdtuw.ac.in emails are allowed.');
        }*/
       setUser(currentUser);
       setAuthorized(true);
      } else {
        setUser(null);
        setAuthorized(false);
      }
      setCheckingAuth(false);
    });
    return () => unsubscribe();
  }, []);

  const signOut=async()=>{
    try{
        await auth.signOut();
        localStorage.removeItem('user')
        setUser(null);
    }catch(error){
      alert(error);
    }
  }

  const[company,setcompany]=useState([]);

  const getCompanies = () => {
  try {
    const comp = onSnapshot(collection(db, 'Companies'), (snapshot) => {
      const now = new Date();
      const tempcompany = snapshot.docs.map((doc) => ({
        id: doc.id,
        company: doc.data()
      }))
      .filter((item) => item.company.deadline.toDate() > now);

      setcompany(tempcompany); 
    });

    return comp;
  } catch (err) {
    console.error("error fetching companies:", err);
  }
};

  useEffect(()=>{
    getCompanies();
  },[])

  if (checkingAuth) {
  return <div className="text-center mt-10 text-lg">Loading...</div>;
 }
  return (
    <Router>
      {
        !user || !authorized?(
          <SignIn setUser={setUser}/>
        ):(
          <div>
          <Routes>
          <Route path="/" element={<Dashboard company={company} signOut={signOut}/>} />
          <Route path="/apply/:companyId" element={<ApplyForm />} />
          </Routes>
          </div>
        )
      }
    </Router>
  );
}

export default App