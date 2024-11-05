'use client'
import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import toast from 'react-hot-toast'
const Editorheader = () => {
    const [title, setTitle] = useState('Untitled');
    const [disable, setDisable] = useState(true);
    const inputRef = useRef(null); // Create a reference for the input field

    const handleOnChange = (e) => {
        setTitle(e.target.value);
    }

    const handleEdit = () => {
        setDisable(false);
        setTimeout(() => inputRef.current?.focus(), 0); // Focus the input after enabling
    }

    const handleBlur = () => {
        if (title === "") {
            toast.error("Write something title cannot be empty!")
            handleEdit();
        }
        else {
            setDisable(true); // Disable editing when input loses focus
        }

    }
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            setDisable(true); // Disable editing when Enter key is pressed
            inputRef.current?.blur(); // Remove focus from the input
        }
    }

    return (
        <div className="bg-slate-950 flex justify-center md:justify-between items-center px-4">
            <div className="flex-row gap-x-2 md:flex items-center justify-center hidden">
                <Image src="/assets/images/logo.png" width="40" height="40" alt="SuperDocs_Logo" />
                <div className='font-extrabold text-white'>SuperDocs</div>
            </div>
            <div className="flex gap-x-1 md:items-center justify-center">
                <input
                     ref={inputRef}
                     className="bg-transparent text-center text-white font-semibold border-b-2 border-white focus:border-blue-300 transition-all duration-300 ease-in-out outline-none"
                     style={{
                         minWidth: '100px',                // Minimum width for better usability
                         width: `${Math.max(100, title.length * 10)}px`,  // Width based on content length (10 pixels per character)
                         maxWidth: '100%',                 // Limit the width to prevent overflow
                         padding: '0.5rem 0.75rem',
                         transition: 'width 0.2s ease-in-out', // Smooth width adjustment
                         boxSizing: 'border-box',          // Ensure padding is included in the width
                     }}
                    onChange={handleOnChange}
                    onBlur={handleBlur} // Add onBlur to handle click outside
                    onKeyDown={handleKeyDown}
                    value={title}
                    disabled={disable}
                />
                <button onClick={handleEdit}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#B4C6EE">
                        <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h357l-80 80H200v560h560v-278l80-80v358q0 33-23.5 56.5T760-120H200Zm280-360ZM360-360v-170l367-367q12-12 27-18t30-6q16 0 30.5 6t26.5 18l56 57q11 12 17 26.5t6 29.5q0 15-5.5 29.5T897-728L530-360H360Zm481-424-56-56 56 56ZM440-440h56l232-232-28-28-29-28-231 231v57Zm260-260-29-28 29 28 28 28-28-28Z" />
                    </svg>
                </button>
            </div>
            <div className="p-4 hidden md:block text-white text-xl ">
                Notifications
            </div>
        </div>
    )
}

export default Editorheader;
