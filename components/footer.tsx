import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Logo from '@/public/logo/iai-logo-black.png';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-red-800 from-20% via-cyan-400 via-40% to-cyan-500 to-90% py-1 flex items-center justify-center sticky bottom-0 z-30">
      <div className="flex items-center justify-center">
        <p className='px-3 text-black text-sm font-semibold'>Property of</p>
        <Link className='flex' href="/">
        <Image src={Logo} alt='altlogo ' className='items-center' width={98}/>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
