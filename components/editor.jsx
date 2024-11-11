'use client'
import { useRef, useEffect, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';

export default function Editor_Implement() {
  const editorRef = useRef(null);
  const [editorHeight, setEditorHeight] = useState(5000); // Default to desktop height
  const [editorKey, setEditorKey] = useState(0); // Forcing re-render on height change

  // Function to update editor height based on window width
  const updateEditorHeight = () => {
    const newHeight = window.innerWidth <= 768 ? 500 : 5000;
    setEditorHeight(newHeight);
    setEditorKey(prevKey => prevKey + 1); // Trigger re-render by updating key
  };

  useEffect(() => {
    updateEditorHeight(); // Set initial height based on screen width
    window.addEventListener('resize', updateEditorHeight);
    return () => window.removeEventListener('resize', updateEditorHeight);
  }, []);

  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  return (
    <>
      <Editor
        key={editorKey}  // Re-render Editor component on height change
        className="w-full h-screen"
        apiKey="7rswlbkic1qza5znchgqu539ab63jv62oa7bk3ykax73vf5k"
        onInit={(_evt, editor) => (editorRef.current = editor)}
        initialValue="<p>This is the initial content of the editor.</p>"
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
      <button onClick={log}>Log editor content</button>
    </>
  );
}
