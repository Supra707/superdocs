'use client';
import React from 'react';
import Signinbutton from '@/components/signinbutton';
import { useState, useEffect } from 'react';
import { auth } from '@/firebase.config';
import { onAuthStateChanged } from 'firebase/auth';
import Link from 'next/link';
import Typewriter from 'typewriter-effect';
const colors = [
  '#2196f3',
  '#f43f5e',
  '#ec4899',
  '#d946ef',
  '#a855f7',
  '#8b5cf6',
  '#6366f1',
  '#3b82f6',
  '#0ea5e9',
  '#06b6d4',
  '#14b8a6',
  '#10b981',
  '#22c55e',
  '#84cc16',
  '#eab308',
  '#f59e0b',
  '#f97316',
  '#ef4444',
];

const Home = () => {
  const [user, setUser] = useState(null);
  const [currentColorIndex, setCurrentColorIndex] = useState(0);

  useEffect(() => {
    // Set up an authentication state observer
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user); // Update user state when auth state changes
    });

    // Start cycling through colors
    const colorChangeInterval = setInterval(() => {
      setCurrentColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
    }, 2000); // Change color every 3 seconds

    // Cleanup subscriptions on unmount
    return () => {
      unsubscribe();
      clearInterval(colorChangeInterval);
    };
  }, []);

  return (
    <div className="bg-slate-900 text-black w-full h-[100vh] ">
      {/* Navbar */}
      <div style={{ backgroundColor: colors[currentColorIndex] }} className="flex  justify-center md:justify-between p-8 gap-x-10 items-center w-full h-[6vh] transition-colors duration-1000">
        <div className="flex justify-around gap-x-3 items-center">
          <Link href="/">
            <div className="flex items-center gap-x-1 text-xl text-white font-extrabold">
              <img src="/assets/images/logo.png" alt="Logo" />
              SuperDocs
            </div>
          </Link>
        </div>
        <div className='hidden md:block text-[40px]  font-bold  text-white'>
          <Typewriter
            options={{
              strings: ['Collaborative Editing', 'All in Real Time'],
              autoStart: true,
              loop: true,
            }}
          />

        </div>
        <Signinbutton />
      </div>
      {/* Hero Section */}
      <div className="md:text-center">
        <div className="m-4 font-extrabold text-5xl md:text-9xl [text-wrap:balance] bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 to-50% to-slate-200">Trusted by the most innovative minds in
          <span className="text-indigo-500 inline-flex flex-col h-[calc(theme(fontSize.6xl)*theme(lineHeight.tight))] md:h-[calc(theme(fontSize.9xl)*theme(lineHeight.tight))] overflow-hidden">
            <ul class="block animate-text-slide-5 text-left leading-tight [&_li]:block">
              <li>&nbsp;Finance</li>
              <li>&nbsp;Tech</li>
              <li>&nbsp;AI</li>
              <li>&nbsp;Crypto</li>
              <li>&nbsp;eCommerce</li>
              <li aria-hidden="true">&nbsp;Finance</li>
            </ul>
          </span>


        </div>
        <div className="w-full text-white font-bold grid grid-cols-1 md:grid-cols-2">

          <div className="flex md:justify-center items-center md:items-start mt-auto md:mt-0"> {/* Adjust button alignment */}
            <button className="w-full md:w-auto md:self-start md:relative md:bottom-auto fixed bottom-4 left-4 right-4"> {/* Button at bottom on mobile */}
              Get Started/Dashboard
            </button>
          </div>
          <div className="flex justify-center items-center"> {/* Center the 3D model in the first column */}
            3D MODEL
          </div>

        </div>

      </div>

    </div>
  );
};

export default Home;
