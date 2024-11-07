"use client";
import React, { useEffect, useState } from "react";
import { auth } from "@/firebase.config";
import Modal from "@/components/modal";
import {
  isSignInWithEmailLink,
  signInWithEmailLink,
  onAuthStateChanged,
} from "firebase/auth";
import Image from "next/image";
const page= () => {
  let index=1;
  const[doc,setdoc]=useState("");
  const[ok,setok]=useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // Initialize an empty array for documents
  const [documents, setDocuments] = useState([]);

  // Function to handle adding a new document
  const handleAddDocument = () => {
    setDocuments((prevDocs) => [
      { id:index, title:doc, isButton: false },
      ...prevDocs, // Insert new card at the left
    ]);
  };
  useEffect(()=>{
    if(ok){
      handleAddDocument();
      index++;
      console.log(doc);
      setdoc("");
      setok(false);
    }
  },[ok]);
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
      <div className="bg-slate-900 w-full min-h-screen ">
        <div className="p-8 ">
          <div className="text-white font-extrabold text-3xl mb-6">
            Welcome Back, {auth.currentUser?.displayName || "User "}
          </div>

          <div className="flex gap-4 flex-wrap items-center flex-col md:flex-row justify-center md:justify-start relative ">
            {/* Display Document Cards */}
            {documents
              .slice()
              .reverse()
              .map((document) => (
                <div
                  key={document.id}
                  className={`flex flex-col items-center justify-center text-white w-44 h-44 bg-blue-600 bg-opacity-20 border border-gray-200 rounded-lg transition-all duration-500 ease-out animate-slide-in-left`}
                >
                  <img
                    src="https://img.icons8.com/?size=100&id=30464&format=png&color=000000"
                    className="w-20 h-20 object-cover mb-2"
                    alt="Document Icon"
                  />
                  <p className="text-[15px]">{document.title}</p>
                </div>
              ))}

            {/* Create New Document Button */}
            <Modal doc={doc} setdoc={setdoc} setok={setok}/>
            
          </div>
        </div>
      </div>
    );
  }

  // If sign-in failed or user is not signed in
  return <div>Sign-in failed or invalid link. Please try again.</div>;
};

export default page;
