import Image from 'next/image';
import React from 'react';

const Navbar = () => {
    return (
        <div className='bg-[#649EC4] flex items-center justify-between px-10'>
            <Image src={'/assets/Logo.png'} alt='Logo' height={100} width={100}></Image>
            <h1>Wanderlast</h1>
            <ul className='flex space-x-3'>
              <li>Home</li>
              <li>SignIn</li>
            <li>profile</li>
           </ul>
           <ul className='flex space-x-3'>
              <li>Login</li>
              <li>SignIn</li>
            <li>profile</li>
           </ul>
        </div>
    );
};

export default Navbar;