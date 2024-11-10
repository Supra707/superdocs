"use client";
import { useState } from "react";
import { Button } from "@nextui-org/button";
import {
  Credenza,
  CredenzaBody,
  CredenzaContent,
  CredenzaDescription,
  CredenzaFooter,
  CredenzaHeader,
  CredenzaTitle,
} from "@/components/Credneza";
import ModalContent from "./modalcontent";
import { toast } from "react-hot-toast"; // Ensure you import your toast notification system
const Modal = ({docu,setdoc,setok}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <div>
      <Button
        className="flex flex-col justify-center items-center text-white w-44 h-44 bg-blue-600 bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-lg border border-gray-200 hover:border-yellow-500 hover:border-4 hover:scale-95 hover:bg-blue-500  transition-all duration-300 ease-in-out"
        onClick={handleOpen}
      >
        <img
          src="https://img.icons8.com/?size=100&id=7QBENrGpaLMB&format=png&color=000000"
          className="w-20 h-20 object-cover transition-transform duration-300 ease-in-out hover:scale-105"
          alt="New Document Icon"
        />
        <p className="text-[15px] mt-2">Create New Document</p>
      </Button>

      <Credenza open={open} onOpenChange={setOpen}>
        <CredenzaContent>
          <CredenzaHeader>
            <CredenzaTitle className="font-extrabold text-2xl">
              SuperDocs
            </CredenzaTitle>
            <CredenzaDescription>New Document Creation</CredenzaDescription>
            <p className="mt-3 text-gray-700 text-base font-medium tracking-normal flex items-center space-x-1">
              <span className="text-lg">🚀</span>
              <span>All Documents Created will be saved in the Cloud</span>
            </p>
          </CredenzaHeader>
          <CredenzaBody>
            <ModalContent docu={docu} setdoc={setdoc} setok={setok} setOpen={setOpen} />
          </CredenzaBody>
          <CredenzaFooter>
            {/* Optional footer content can go here */}
          </CredenzaFooter>
        </CredenzaContent>
      </Credenza>
    </div>
  );
};
export default Modal;
