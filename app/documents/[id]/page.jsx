// Page.js
'use client'
import { auth } from '@/firebase.config';
import React, { useState, useEffect } from 'react';
import CommentCard from '@/components/commentcard';
import { onAuthStateChanged } from 'firebase/auth';
import { db } from '@/firebase.config';
import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { useParams } from 'next/navigation';
import Editor_Implement from "@/components/editor";

const Page = () => {
    const [comment, setComment] = useState(""); // Hold the current comment value
    const [comments, setComments] = useState([]); // Initialize an array of comments
    const [posted, setPosted] = useState(false); // Flag to trigger comment submission
    const [user, setUser] = useState(null); // User state
    const [loading, setLoading] = useState(true); // Loading state
    const params = useParams();
    const [documentId, setDocumentId] = useState('');
    const [title, setTitle] = useState("");

    // Function to add a new comment to the array
    const addComment = (newComment) => {
        setComments((prevComments) => [...prevComments, newComment]);
    };

    // Function to fetch comments from Firestore
    const fetchComments = async () => {
        try {
            const documentRef = doc(db, 'Documents', documentId);
            const documentSnap = await getDoc(documentRef);

            if (documentSnap.exists()) {
                const data = documentSnap.data();
                setComments(data.comments || []); // Initialize comments if they exist
            } else {
                console.log('No such document!');
            }
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    // Fetch comments only when the documentId changes and is non-empty
    useEffect(() => {
        if (documentId) {
            fetchComments();
        }
    }, [documentId]);

    useEffect(() => {
        const fetchDocumentTitle = async () => {
            if (params.id) {
                setDocumentId(params.id);
                const documentRef = doc(db, 'Documents',params.id);
                const documentsnap=await getDoc(documentRef);
                setTitle(documentsnap.data().Title);
            }
        };
        fetchDocumentTitle();
    }, [params.id]);

    // Effect to monitor authentication state
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (authUser) => {
            setUser(authUser);
            setLoading(false); // Set loading to false once user is set
        });
        
        return () => unsubscribe();
    }, []);

    // Effect to handle adding the comment to Firestore when 'posted' flag changes
    useEffect(() => {
        const addCommentToFirestore = async () => {
            try {
                const documentRef = doc(db, 'Documents', documentId);
                await updateDoc(documentRef, {
                    comments: arrayUnion({
                        text: comment,
                        user: user.displayName,
                        timestamp: new Date(), // Add a timestamp if needed
                    }),
                });

                // Update the UI with the new comment
                addComment({
                    text: comment,
                    user: user.displayName,
                    timestamp: new Date(),
                });
                console.log('Comment added to Firestore:', comment);
            } catch (error) {
                console.error('Error adding comment to Firestore:', error);
            }
        };

        if (posted && comment && user) {
            addCommentToFirestore();
            setPosted(false); // Reset the 'posted' flag after adding the comment
            setComment(''); // Clear the comment input
        }
    }, [posted, comment, documentId, user]);

    // Conditional rendering
    if (loading) {
        return (
            <div className="text-white font-bold">Loading...</div>
        );
    }

    if (!user) {
        return (
            <div className="text-white font-bold">Not signed in</div>
        );
    }

    return (
        <div className="flex flex-col md:flex-row text-white font-bold md:gap-x-2 items-start">
            <div className="flex flex-col gap-y-4 p-4 md:p-8 md:w-3/4 w-full">
                <div>
                    <h1 className="text-4xl font-extrabold text-white">{title}</h1>
                </div>
                {/* Left side: Editor and Editor Header */}
                <div className="">
                    <Editor_Implement />
                </div>
            </div>

            {/* Right side: Comments Section */}
            <div className="flex flex-col w-full md:w-1/4 md:mt-14 p-4 md:p-8 ">
                <div className="mb-4 w-full">
                    <CommentCard  title={title} setComment={setComment} setPosted={setPosted} />
                </div>

                {/* List of Comments */}
                <h2 className="text-white font-bold text-2xl">Comments</h2>
                <br />
                <div className="text-white flex flex-col gap-y-4 w-full">
                    {comments.length > 0 ? (
                        comments.slice().reverse().map((comment, index) => (
                            <div key={index} className="bg-gray-800 p-4 rounded-md max-w-full overflow-hidden break-words">
                                <p className="font-medium">{comment.user}</p>
                                <p>{comment.text}</p>
                            </div>
                        ))
                    ) : (
                        <p>No comments yet.</p> // If no comments, display a placeholder
                    )}
                </div>
            </div>
        </div>
    );
};

export default Page;
