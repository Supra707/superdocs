'use client'
import { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

export default function Editor_Implement({height}) {
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
        initialValue="<p>Do Something Amazing</p>"
        init={{
          height: height,
          menubar: true,
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'help', 'wordcount', 'codesample', 'textcolor' // Added textcolor plugin
          ],
          toolbar: `
            undo redo | blocks | fontselect fontsizeselect |  // Added fontselect and fontsizeselect
            bold italic forecolor | alignleft aligncenter 
            alignright alignjustify | bullist numlist outdent indent | 
            removeformat | help | codesample image
          `,
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
          image_upload_url: '/upload-image',  // Configure image upload endpoint
          image_advtab: true,  // Enable advanced image settings
          font_formats: "Arial=arial,helvetica,sans-serif;Comic Sans MS=comic sans ms,sans-serif;Courier New=courier new,courier,monospace;Georgia=georgia,palatino,serif;Times New Roman=times new roman,times,serif;Verdana=verdana,geneva,sans-serif", // Added font formats
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
