'use client'
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Button } from './ui/button';
import Image from 'next/image';
import { ReloadIcon } from "@radix-ui/react-icons"
const ModalContent = ({doc,setOpen,setdoc,setok}) => {
  const [loading, setloading] = useState(false);
  const handleOnChange = (e) => {
    setdoc(e.target.value);
  }
  const handleSubmit=(e)=>{
    e.preventDefault();
    if(doc===""){
        toast.error("Document Name cannot be Empty");
        return;
    }
    setloading(true);
    setTimeout(()=>{
        toast.success("Document Created");
        setloading(false);
        setOpen(false);
        setok(true);
    },2000)

  }
  return (
    <div> <form class="max-w-sm mx-auto">
      <div class="mb-5">
        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Document Name</label>
        <input onChange={handleOnChange} value={doc}  type="email" id="email" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter Document Name..." />
      </div>
      {
        loading ? (<Button disabled className="w-full">
          <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
          Processing
        </Button>) : (<Button className="w-full" onClick={handleSubmit}>Submit</Button>)
      }

    </form></div>
  )
}

export default ModalContent;
