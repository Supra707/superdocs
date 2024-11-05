'use client'
import React, { useState } from 'react'
import { Editor } from '@/components/editor/Editor'
import Editorheader from '@/components/editor/Editorheader'
import { CardWithForm } from '@/components/card'
import CommentCard from '@/components/commentcard'
const Page = () => {
    const Demo_User = "Demo_User";
    const [comments, setComments] = useState([]); // Initialize an array of comments

    // Function to add a new comment to the array
    const addComment = (newComment) => {
        setComments((prevComments) => [...prevComments, newComment]);
    };

    return (
        <div className="w-full h-full bg-slate-900">
            <Editorheader />
            <div className="flex gap-x-8">
                <Editor />
                <div className="relative mt-20 mr-5 flex flex-col gap-y-5">
                    <div>
                        {/* Pass addComment function to CardWithForm */}
                        <CardWithForm addComment={addComment} demo_user={Demo_User} />
                    </div>
                    <div className="text-white flex flex-col gap-y-4">
                        {/* Display all comments */}
                        {comments.map((comment, index) => (
                            <CommentCard key={index} userTagged={comment.user_tagged} commentText={comment.comment_text}/>
                           
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Page;
