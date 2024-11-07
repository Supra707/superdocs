"use client";
import React, { useEffect, useState } from "react";
import { auth } from "@/firebase.config";

import {
  isSignInWithEmailLink,
  signInWithEmailLink,
  onAuthStateChanged,
} from "firebase/auth";
import Image from "next/image";
const SignInCallback = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // Initialize an empty array for documents
  const [documents, setDocuments] = useState([]);

  // Function to handle adding a new document
  const handleAddDocument = () => {
    setDocuments((prevDocs) => [
      { id: prevDocs.length, isButton: false },
      ...prevDocs, // Insert new card at the left
    ]);
  };
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
    return (
      <div className="bg-slate-900 w-full min-h-screen p-4">
        <div className="text-white font-extrabold text-3xl mb-6 pl-4">
          Welcome Back, {auth.currentUser?.displayName || "User "}
        </div>

        <div className="flex gap-4 flex-wrap items-center flex-col md:flex-row justify-center md:justify-start relative ">
          {/* Display Document Cards */}
          {documents
            .slice()
            .reverse()
            .map((doc) => (
              <div
                key={doc.id}
                className={`flex flex-col items-center justify-center text-white w-44 h-44 bg-blue-600 bg-opacity-20 border border-gray-200 rounded-lg transition-all duration-500 ease-out animate-slide-in-left`}
              >
                <img
                  src="https://img.icons8.com/?size=100&id=7QBENrGpaLMB&format=png&color=000000"
                  className="w-20 h-20 object-cover mb-2"
                  alt="Document Icon"
                />
                <p className="text-[15px]">Document {doc.id}</p>
              </div>
            ))}

          {/* Create New Document Button */}
          <button
            onClick={handleAddDocument}
            className="flex flex-col justify-center items-center text-white w-44 h-44 bg-blue-600 bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-lg border border-gray-200 hover:border-yellow-500 transition duration-300 ease-in-out"
          >
            <img
              src="https://img.icons8.com/?size=100&id=7QBENrGpaLMB&format=png&color=000000"
              className="w-20 h-20 object-cover transition-transform duration-300 ease-in-out hover:scale-105"
              alt="New Document Icon"
            />
            <p className="text-[15px] mt-2">Create New Document</p>
          </button>
        </div>
      </div>
    );
  }

  // If sign-in failed or user is not signed in
  return <div>Sign-in failed or invalid link. Please try again.</div>;
};

export default SignInCallback;
