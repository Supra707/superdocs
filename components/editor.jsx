'use client'
import { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

export default function Editor_Implement() {
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };
  return (
    <>
      <Editor
        apiKey="7rswlbkic1qza5znchgqu539ab63jv62oa7bk3ykax73vf5k"
        onInit={(_evt, editor) => (editorRef.current = editor)}
        initialValue="<p>This is the initial content of the editor.</p>"
        init={{
          height: 500,
          menubar: false,
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'help', 'wordcount', 'codesample'
          ],
          toolbar: `
            undo redo | blocks | 
            bold italic forecolor | alignleft aligncenter 
            alignright alignjustify | bullist numlist outdent indent | 
            removeformat | help | codesample image
        `,
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
          image_upload_url: '/upload-image',  // Configure image upload endpoint
          image_advtab: true,  // Enable advanced image settings
          codesample_languages: [
            { text: 'JavaScript', value: 'javascript' },
            { text: 'Python', value: 'python' },
            { text: 'Java', value: 'java' },
            { text: 'C++', value: 'cpp' },
            { text: 'Ruby', value: 'ruby' },
            { text: 'HTML', value: 'html' },
            { text: 'CSS', value: 'css' }
          ],
          code_dialog_width: 800, // Adjust code dialog width
          code_dialog_height: 600, // Adjust code dialog height
        }}
      />
      <button onClick={log}>Log editor content</button>
    </>
  );
}