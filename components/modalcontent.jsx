"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "@nextui-org/button";
import { collection, addDoc,serverTimestamp } from "firebase/firestore"; 
import { auth,db } from "@/firebase.config";
const ModalContent = ({ docu, setOpen, setdoc, setok }) => {
  const [loading, setloading] = useState(false);
  const handleOnChange = (e) => {
    setdoc(e.target.value);
  };
  const handleSubmit = async(e) => {
    e.preventDefault();
    if (docu === "") {
      toast.error("Document Name cannot be Empty");
      return;
    }
    setloading(true);
    //passing data about the document to the firestore database//
    try {
      const docRef = await addDoc(collection(db, "Documents"), {
        User:auth.currentUser.displayName,
        Title:docu,
        createdAt: serverTimestamp()
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
   
      toast.success("Document Created");
      setloading(false);
      setOpen(false);
      setok(true);
    
  };
  return (
    <div>
      {" "}
      <form class="max-w-sm mx-auto">
        <div class="mb-5">
          <label
            for="email"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Enter Document Name
          </label>
          <input
            onChange={handleOnChange}
            value={docu}
            type="email"
            id="email"
            class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="Enter Document Name..."
          />
        </div>
        {loading ? (
          <Button color="primary" isLoading className="w-full">
            Processing
          </Button>
        ) : (
          <Button
            variant="shadow"
            className="w-full bg-blue-700 text-white text-md font-bold"
            onClick={handleSubmit}
          >
            LogIn
          </Button>
        )}
      </form>
    </div>
  );
};

export default ModalContent;
