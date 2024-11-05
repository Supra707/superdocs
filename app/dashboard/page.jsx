'use client';
import React, { useEffect, useState } from 'react';
import { auth } from '@/firebase.config';
import { isSignInWithEmailLink, signInWithEmailLink, onAuthStateChanged } from 'firebase/auth';

const SignInCallback = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listener to track authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser); // Update user state
      setLoading(false); // Stop loading when auth state is determined
    });

    // Passwordless sign-in handling
    const handleSignInWithLink = async () => {
      const url = window.location.href;
      if (isSignInWithEmailLink(auth, url)) {
        const email = localStorage.getItem("emailForSignIn");
        
        if (!email) {
          console.error("No email found in local storage.");
          setLoading(false);
          return;
        }
        
        try {
          const result = await signInWithEmailLink(auth, email, url);
          setUser(result.user); // Set the signed-in user
          localStorage.removeItem("emailForSignIn"); // Clear stored email
        } catch (error) {
          console.error("Error signing in with email link:", error);
        }
      }
    };

    handleSignInWithLink();

    // Cleanup subscription on component unmount
    return () => unsubscribe();
  }, []);

  // Show loading indicator while processing sign-in
  if (loading) {
    return <div>Loading...</div>;
  }

  // If the user is signed in, show the dashboard
  if (user) {
    return <div>Dashboard</div>;
  }

  // If sign-in failed or user is not signed in
  return <div>Sign-in failed or invalid link. Please try again.</div>;
};

export default SignInCallback;
