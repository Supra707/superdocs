"use client";
import React, { useEffect, useState } from "react";
import { auth, db } from "@/firebase.config";
import Modal from "@/components/modal";
import {
  collection,
  query,
  getDocs,
  where,
  orderBy,
  limit,
  addDoc,
} from "firebase/firestore";
import {
  isSignInWithEmailLink,
  signInWithEmailLink,
  onAuthStateChanged,
} from "firebase/auth";

const Page = () => {
  const [docu, setdoc] = useState("");
  const [ok, setok] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [documents, setDocuments] = useState([]);

  // One-time fetch on component mount
  const fetchDocuments = async () => {
    try {
      const q = query(
        collection(db, "Documents"),
        where("User", "==", auth.currentUser?.displayName),
        orderBy("createdAt", "desc")
      );
      const querySnapshot = await getDocs(q);
      const docs = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        title: doc.data().Title,
        isButton: false,
      }));
      setDocuments(docs);
    } catch (error) {
      console.error("Error fetching documents:", error);
    }
  };

  // Fetch the latest document when `ok` is true
  const fetchLatestDocument = async () => {
    const q = query(
      collection(db, "Documents"),
      where("User", "==", auth.currentUser?.displayName),
      orderBy("createdAt", "desc"),
      limit(1)
    );
    const querySnapshot = await getDocs(q);
    const latestDoc = querySnapshot.docs[0];
    if (latestDoc) {
      setDocuments((prevDocs) => [
        { id: latestDoc.id, title: latestDoc.data().Title, isButton: false },
        ...prevDocs,
      ]);
    }
  };

  useEffect(() => {
    if (ok) {
      fetchLatestDocument();
      setdoc(""); // Clear input after adding
      setok(false);
    }
  }, [ok]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser);
      setLoading(false);

      if (authUser) {
        fetchDocuments();
      }
    });

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
          setUser(result.user);
          localStorage.removeItem("emailForSignIn");
          fetchDocuments(); // Fetch documents after sign-in
        } catch (error) {
          console.error("Error signing in with email link:", error);
        }
      }
    };

    handleSignInWithLink();

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (user) {
    return (
      <div className="bg-slate-900 w-full min-h-screen">
        <div className="p-8">
          <div className="text-white font-extrabold text-3xl mb-6">
            Welcome Back, {auth.currentUser?.displayName}
          </div>

          <div className="flex gap-4 flex-wrap items-center flex-col md:flex-row justify-center md:justify-start relative">
            {documents.slice().reverse().map((document) => (
              <button key={document.id}>
                <div
                  className="flex flex-col items-center justify-center text-white w-44 h-44 bg-blue-600 bg-opacity-20 border border-gray-200 rounded-lg transition-all duration-500 ease-out animate-slide-in-left"
                >
                  <img
                    src="https://img.icons8.com/?size=100&id=30464&format=png&color=000000"
                    className="w-20 h-20 object-cover mb-2"
                    alt="Document Icon"
                  />
                  <p className="text-[15px]">{document.title}</p>
                </div>
              </button>
            ))}
            <Modal docu={docu} setdoc={setdoc} setok={setok} />
          </div>
        </div>
      </div>
    );
  }

  return <div>Sign-in failed or invalid link. Please try again.</div>;
};

export default Page;
