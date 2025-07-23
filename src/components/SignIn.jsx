import React from 'react'
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../firebase';
import { useNavigate } from 'react-router-dom';

function SignIn({setUser}) {

   const navigate = useNavigate(); 

   const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      let user = result.user;
      let newUser={
          name:user.displayName,
          email:user.email,
          photo:user.photoURL,
          uid:user.uid
      }
      localStorage.setItem('user',JSON.stringify(newUser)) //only stores strings
      setUser(newUser)
      navigate('/');
      // ✅ Check if email ends with @igdtuw.ac.in
      /*if (userEmail.endsWith('@igdtuw.ac.in')) {
        console.log('Access granted:', userEmail);
        // Redirect handled by App.jsx
      } else {
        alert('Access restricted. Please log in with your college ID (@igdtuw.ac.in)');
        // Sign out immediately if not allowed
        auth.signOut();
      }*/
    } catch (error) {
        alert(error.message);
    }
  };
    
  return (
<div className="bg-pink-300 h-[100vh] w-[100vw] flex justify-center items-center">
  <div className="h-[60%] w-[80%] bg-white shadow-xl shadow-pink-500 flex flex-col items-center gap-y-[20px]">
    <div className="font-bold text-2xl bg-pink-200 h-[150px] w-[100%] flex text-center items-center justify-center md:text-3xl lg:text-4xl">Welcome To Campus Placement Portal</div>
    <hr></hr>
    <div className=" h-[70px] flex justify-center items-center text-xl text-center italic font-bold underline decoration-red-400 sm:text-2xl md:text-3xl lg:text-3xl">
        <span className="text-red-800">*</span>
        Sign in with your college id 
    </div>
    <button
        onClick={handleLogin}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 w-[80%] h-[10%] mt-[50px] text-xl cursor-pointer md:text-2xl lg:text-2xl lg:w-[50%]"
      >
        Sign In
      </button>
  </div>
</div>  )
}

export default SignIn