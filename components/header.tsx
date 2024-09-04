import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Logo from '@/public/logo/iai-logo-white.png';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-red-800 from-20% via-cyan-400 via-40% to-cyan-500 to-90% text-black p-4 flex justify-between items-center sticky top-0 z-50">
      <div className="flex items-center">
        <Link className='flex' href="/">
        <Image src={Logo} alt='altlogo' width={180}/>
        </Link>
      </div>
      <nav className="flex space-x-10">
        <a href="#" className="hover:text-white text-black font-semibold">Tools</a>
        <a href="#" className="hover:text-white text-black font-semibold">Help</a>
        <a href="#" className="hover:text-white text-black font-semibold">Sign Up</a>
        <a href="#" className="hover:text-white text-black font-semibold">Login</a>
      </nav>
    </header>
  );
};

export default Header;
