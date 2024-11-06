'use client'
import React, { useState } from 'react';
import {useRouter} from 'next/navigation';
import { auth } from '@/firebase.config';
import { sendSignInLinkToEmail } from 'firebase/auth';
import toast from 'react-hot-toast';
import { Button } from './ui/button';
import Image from 'next/image';
import { ReloadIcon } from "@radix-ui/react-icons"
import { getAuth, signInWithPopup, GoogleAuthProvider,GithubAuthProvider } from 'firebase/auth';
const SignUp = ({setOpen,setmagicsent}) => {
  const router=useRouter();
  const [email, setEmail] = useState("");
  const [checked, setChecked] = useState(false);
  const [loading, setloading] = useState(false);
  const handleOnChange = (e) => {
    setEmail(e.target.value);
  }

  const handleCheck = (e) => {
    setChecked(e.target.checked);
  }
  //  // Firebase passwordless sign-in
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Regular expression to validate email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Check if email is empty or terms are not accepted
    if(email==="" && !checked){
      toast.error("Please check terms and conditions");
      toast.error("Email is empty!!");
      return;
    }
    if (!checked) {
      toast.error("Please check terms and conditions");
      return;
    }

    if (email === "") {
      toast.error("Email is empty!!");
      return;
    }
   
    // Check if email format is valid
    if (!emailPattern.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

 
    const actionCodeSettings = {
      // URL you want to redirect back to after email verification
      url: 'https://superdocs-mu.vercel.app/dashboard', // Change to your production URL
      handleCodeInApp: true,
    };
    setloading(true);
    try {
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      toast.success("Check your email for the sign-in link!");
       

      localStorage.setItem('emailForSignIn', email); // Save the email to local storage
      setEmail(""); // Clear the email input
      setChecked(false); // Uncheck the checkbox
      // Force page reload here
    window.location.reload();
    } catch (error) {
      toast.error(error.message);
    }
    setloading(false);
    setOpen(false);
    setmagicsent(localStorage.getItem('emailForSignIn'));
    
  };
  //google sign in//
  const handleGoogleSignIn = async () => {
    const auth = getAuth();
   
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user; // The signed-in user object

      console.log("User signed in:", user);
      // Proceed with user information (store, redirect, etc.)
      setOpen(false);
      router.push('/dashboard');

    } catch (error) {
      console.error("Error signing in with Google:", error);
      toast.error("Failed to sign in with Google. Please try again.");
    }
  };
  //github sign in//
  const handleGitHubSignIn = async () => {
    const auth = getAuth();
    const provider = new GithubAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user; // The signed-in user object

      console.log("User signed in:", user);
      // Proceed with user information (store, redirect, etc.)
      setOpen(false);
      router.push('/dashboard');
    } catch (error) {
      console.error("Error signing in with GitHub:", error);
      toast.error("Failed to sign in with GitHub. Please try again.");
    }
  };

  return (
    <div> <form class="max-w-sm mx-auto">
      <div class="mb-5">
        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Email</label>
        <input onChange={handleOnChange} value={email} type="email" id="email" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter Phone..." />
      </div>
      <div class="flex items-start mb-5">
        <div class="flex items-center h-5">
          <input onChange={handleCheck} checked={checked} id="terms" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" />
        </div>

        <label for="terms" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree with the <a href="#" class="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a></label>
      </div>
      {
        loading ? (<Button disabled className="w-full">
          <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
          Processing
        </Button>) : (<Button className="w-full" onClick={handleSubmit}>LogIn</Button>)
      }


      <div className="flex gap-x-1 p-4 items-center">
        <span className="w-full h-[0.1px] bg-black"></span>
        <span className="text-slate-500 tex-sm" >or</span>
        <span className="w-full h-[0.1px] bg-black"></span>
      </div>
      <div className="flex flex-col gap-y-5 justify-center items-center">
        <button onClick={handleGoogleSignIn} type="button" className="w-full justify-center gap-x-3 flex items-center bg-white dark:bg-gray-900 border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800 dark:text-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
          <span><Image src="https://www.vectorlogo.zone/logos/google/google-icon.svg" width={20} height={20} alt="Google icon" /></span>
          <span>Continue with Google</span>
        </button>
        <button onClick={handleGitHubSignIn} type="button" className="py-2 px-4 max-w-md flex justify-center items-center bg-gray-600 hover:bg-gray-700 focus:ring-gray-500 focus:ring-offset-gray-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="mr-2" viewBox="0 0 1792 1792">
            <path d="M896 128q209 0 385.5 103t279.5 279.5 103 385.5q0 251-146.5 451.5t-378.5 277.5q-27 5-40-7t-13-30q0-3 .5-76.5t.5-134.5q0-97-52-142 57-6 102.5-18t94-39 81-66.5 53-105 20.5-150.5q0-119-79-206 37-91-8-204-28-9-81 11t-92 44l-38 24q-93-26-192-26t-192 26q-16-11-42.5-27t-83.5-38.5-85-13.5q-45 113-8 204-79 87-79 206 0 85 20.5 150t52.5 105 80.5 67 94 39 102.5 18q-39 36-49 103-21 10-45 15t-57 5-65.5-21.5-55.5-62.5q-19-32-48.5-52t-49.5-24l-20-3q-21 0-29 4.5t-5 11.5 9 14 13 12l7 5q22 10 43.5 38t31.5 51l10 23q13 38 44 61.5t67 30 69.5 7 55.5-3.5l23-4q0 38 .5 88.5t.5 54.5q0 18-13 30t-40 7q-232-77-378.5-277.5t-146.5-451.5q0-209 103-385.5t279.5-279.5 385.5-103zm-477 1103q3-7-7-12-10-3-13 2-3 7 7 12 9 6 13-2zm31 34q7-5-2-16-10-9-16-3-7 5 2 16 10 10 16 3zm30 45q9-7 0-19-8-13-17-6-9 5 0 18t17 7zm42 42q8-8-4-19-12-12-20-3-9 8 4 19 12 12 20 3zm57 25q3-11-13-16-15-4-19 7t13 15q15 6 19-6zm63 5q0-13-17-11-16 0-16 11 0 13 17 11 16 0 16-11zm58-10q-2-11-18-9-16 3-14 15t18 8 14-14z"></path>
          </svg>
          Continue with GitHub
        </button>

      </div>
    </form></div>
  )
}

export default SignUp;
