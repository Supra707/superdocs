// Page.js
'use client'
import { auth } from '@/firebase.config';
import React, { useState, useEffect } from 'react';
import CommentCard from '@/components/commentcard';
import { onAuthStateChanged } from 'firebase/auth';
const Page = () => {
    const [comment, setComment] = useState(""); // Hold the current comment value
    const [comments, setComments] = useState([]); // Initialize an array of comments
    const [posted, setPosted] = useState(false); // Flag to trigger comment submission
    const[user,setUser]=useState(null);
    // Function to add a new comment to the array
    const addComment = (newComment) => {
        setComments((prevComments) => [...prevComments, newComment]);
    };
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (authUser) => {
            setUser(authUser);
        });
        return () => unsubscribe();
    }, []);

    // useEffect to handle adding the comment when 'posted' flag changes
    useEffect(() => {
        if (posted) {
            if (comment) {
                addComment(comment);  // Add the comment to thnpme array
            }
            comments.forEach((comment) => {
                console.log(comment);
            })
            setPosted(false);  // Reset the 'posted' flag after adding comment
        }
    }, [posted, comment]);
    if (user) {
        return (
            <div className="p-8 w-full h-full bg-slate-900 flex flex-col md:flex-row text-white font-bold gap-y-4 md:gap-x-8 md:justify-between">
                {/* Left side: Editor and Editor Header */}
                <div className="flex flex-col w-full md:w-1/2 gap-y-2">
                    <div className="text-white">
                        EditorHeader
                    </div>

                    <div className="text-white">
                        Editor
                    </div>
                </div>

                {/* Right side: Comments Section */}
                <div className="flex flex-col w-full md:w-1/4">
                    <div className="mb-4 w-full">
                        <CommentCard setComment={setComment} setPosted={setPosted} />
                    </div>

                    {/* List of Comments */}
                    <div className="text-white flex flex-col gap-y-4 w-full">
                        {comments.length > 0 ? (
                            comments.map((comment, index) => (
                                <div key={index} className="bg-gray-800 p-4 rounded-md max-w-full overflow-hidden break-words">
                                    {comment}
                                </div>
                            ))
                        ) : (
                            <p>No comments yet.</p> // If no comments, display a placeholder
                        )}
                    </div>
                </div>
            </div>
        )

    }
    else {
        return(
            <div className="text-white font-bold">Not singed in</div>
        )
       
    }
};

export default Page;

