'use client'
import { authClient } from '@/lib/auth-client';
import { Avatar, Button } from '@heroui/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Navbar = () => {
    const { 
        data: session, 
       
    } = authClient.useSession()
const user=session?.user
console.log(user)
const handleSignOut=async()=>{
   await authClient.signOut()
}
  
    return (
        <div className='bg-[#649EC4] flex items-center justify-between px-10'>
            <Image src={'/assets/Logo.png'} alt='Logo' height={100} width={100}></Image>
            <h1>Wanderlast</h1>
            <ul className='flex space-x-3'>
              <li><Link href={'/'}>Home</Link></li>
              <li>All pets</li>
        
           </ul>
                 <ul className='flex items-center gap-3'>
                <li>
                    <Link href={'/profile'}>Profile</Link>
                </li>
           {  user?<>
              <li>
                 <Avatar>
        <Avatar.Image referrerPolicy='no-referrer' alt="John Doe" src={user?.image} />
        <Avatar.Fallback>{user.name.charAt(0)}</Avatar.Fallback>
      </Avatar>
              </li>
              <li>

                <Button variant="danger" className={'rounded-none'} onClick={handleSignOut}>Logout</Button>
              </li>
           </> :<>
                <li>
                    <Link href={'/login'}>Login</Link>
                </li>
                <li>
                    <Link href={'/signup'}>Sign Up</Link>
                </li></>
                }
                
            </ul>
        </div>
    );
};

export default Navbar;