'use client';
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

import {
  Credenza,
  CredenzaBody,
  CredenzaContent,
  CredenzaDescription,
  CredenzaFooter,
  CredenzaHeader,
  CredenzaTitle,
} from "@/components/Credneza";
import SignUp from "@/components/signup";
import { auth } from "@/firebase.config";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { toast } from 'react-hot-toast'; // Ensure you import your toast notification system

const Signinbutton=({className,text})=>{
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [magicsent,setmagicsent]=useState(null);
  useEffect(() => {
    // Access localStorage on the client side after the component mounts
    const emailForSignIn = localStorage.getItem('emailForSignIn');
    setmagicsent(emailForSignIn);
  }, []);
  useEffect(() => {
    // Set up an authentication state observer
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user); // Update user state when auth state changes
    });
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const handleOpen = () => {
    setOpen(true);
  }

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      toast.success("Successfully signed out!"); // Notify user of successful sign-out
    } catch (error) {
      console.error("Error signing out:", error);
      toast.error("Error signing out! Please try again."); // Notify user of error
    }
  };

  return (
    <div>
      {user? (
        <Button  className={className} onClick={handleSignOut}>Log Out</Button>
      ) : (
        (magicsent==null)?( <Button className={className} onClick={handleOpen}>{text}</Button>):(<Button className={className}onClick={handleOpen}>Email Sent</Button>)
       
      )}

      <Credenza open={open} onOpenChange={setOpen}>
        <CredenzaContent>
          <CredenzaHeader>
            <CredenzaTitle className="font-extrabold text-2xl">SuperDocs</CredenzaTitle>
            <CredenzaDescription>
              Rich Collaborative Text Editor.
            </CredenzaDescription>
            <p className="mt-3 text-gray-700 text-base font-medium tracking-normal flex items-center space-x-1">
              <span className="text-lg">🚀</span>
              <span>Log in directly without the hassle of a password!</span>
            </p>
          </CredenzaHeader>
          <CredenzaBody>
            {(magicsent==null)?(<SignUp setOpen={setOpen} setmagicsent={setmagicsent} />):(<div>Email is sent you mororn i am not going to let you misuse the modal anymore go look in your email</div>) } {/*email not sent then normal signup else info modal */}
          </CredenzaBody>
          <CredenzaFooter>
            {/* Optional footer content can go here */}
          </CredenzaFooter>
        </CredenzaContent>
      </Credenza>

    </div>
  );
}
export default Signinbutton;
