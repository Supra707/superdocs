'use client'
import { useRef, useEffect, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import toast from 'react-hot-toast';
import { db } from '@/firebase.config';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
export default function Editor_Implement({save, setsave, documentId }) {
  const editorRef = useRef(null);
  const [editorHeight, setEditorHeight] = useState(5000); // Default to desktop height
  const [editorKey, setEditorKey] = useState(0); // Forcing re-render on height change
  const [editorcontent, seteditorcontent] = useState("<h1><b>Write Something Amazing</b></h1>");
  // Function to update editor height based on window width
  const updateEditorHeight = () => {
    const newHeight = window.innerWidth <= 768 ? 500 : 5000;
    setEditorHeight(newHeight);
    setEditorKey(prevKey => prevKey + 1); // Trigger re-render by updating key
  };
  //fetching the initail value of the editor from firebase//
  const fetch_editor_content = async () => {
    const documentRef = doc(db, 'Documents', documentId);
    const documentsnap = await getDoc(documentRef);
    seteditorcontent(documentsnap.data().content);
  };
  useEffect(() => {
    updateEditorHeight(); // Set initial height based on screen width
    fetch_editor_content();//fetch initial editor content on mounting//
    window.addEventListener('resize', updateEditorHeight);
    return () => window.removeEventListener('resize', updateEditorHeight);
  }, []);


  useEffect(() => {
    if (save) {
      if (editorRef.current) {
        seteditorcontent(editorRef.current.getContent());// passing the editor content to the parent component//
        const addeditorcontentToFirestore = async () => {
          try {
            const documentRef = doc(db, 'Documents', documentId);
            await updateDoc(documentRef, {
              content: editorRef.current.getContent()
            });
            console.log('Comment added to Firestore:', editorcontent);
          } catch (error) {
            console.error('Error adding comment to Firestore:', error);
          }
        };
        addeditorcontentToFirestore();
        toast.success("Document saved succesfully");
      }
      setsave(false);//set save to false for reiteration//
    }
  }, [save])


  return (
    <>
      <Editor
        key={editorKey}  // Re-render Editor component on height change
        className="w-full h-screen"
        apiKey="7rswlbkic1qza5znchgqu539ab63jv62oa7bk3ykax73vf5k"
        onInit={(_evt, editor) => (editorRef.current = editor)}
        initialValue={editorcontent}
        init={{
          height: editorHeight, // Dynamic height based on screen size
          menubar: true,
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'help', 'wordcount', 'codesample'
          ],
          toolbar: `
            undo redo | blocks | fontselect |
            bold italic forecolor | alignleft aligncenter 
            alignright alignjustify | bullist numlist outdent indent | 
            removeformat | help | codesample image
          `,
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
          image_upload_url: '/upload-image',
          image_advtab: true,
          codesample_languages: [
            { text: 'JavaScript', value: 'javascript' },
            { text: 'Python', value: 'python' },
            { text: 'Java', value: 'java' },
            { text: 'C++', value: 'cpp' },
            { text: 'Ruby', value: 'ruby' },
            { text: 'HTML', value: 'html' },
            { text: 'CSS', value: 'css' }
          ],
          code_dialog_width: 800,
          code_dialog_height: 600,
        }}
      />
    </>
  );
}
