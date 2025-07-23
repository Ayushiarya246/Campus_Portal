import React from 'react';
import logo from '../assets/logo.png';

function Header({signOut}) {
  return (
    <div className="w-full bg-black flex flex-col md:flex-row items-center justify-center md:justify-start px-4 py-6 h-auto md:h-[20vh] lg:gap-[100px] lg:pl-[50px]">
    <img
      src={logo}
      className="h-18 w-25 md:h-[90%] md:w-[20%] md:ml-[50px] lg:w-[10%]"
      alt="Logo"
    />

    <div className="flex flex-col md:flex-col md:ml-[50px] mt-4 md:mt-0 lg:flex-row">
      <h1 className="text-white text-2xl md:text-3xl font-bold text-center md:text-left">
        Apply and get your{' '}
        <span className="italic bg-gradient-to-r from-pink-500 to-yellow-400 bg-clip-text text-transparent">
         DREAM JOB
        </span>
      </h1>

      <h2 className="text-blue-800 font-bold text-2xl underline cursor-pointer mt-4 md:mt-4 text-center lg:ml-[300px] lg:mt-[-5px]"
        onClick={signOut}
      >
        Logout
      </h2>
    </div>
  </div>

  );
}
export default Header;

