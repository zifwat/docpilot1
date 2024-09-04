import React from 'react';
import Header from '../components/header';
import Footer from '../components/footer';

interface Props {
    children: React.ReactNode;
}

export default function AuthenticationLayout({ children }: Props) {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex flex-grow">
                {/* Left Column: 30% */}
                <div className="w-3/10 p-4 bg-gray-100">
                    {/* Content for the left column goes here */}
                </div>

                {/* Right Column: 70% */}
                <div className="w-7/10 p-4 bg-slate-700">
                    {children}
                </div>
            </div>
            <Footer />
        </div>
    );
}
