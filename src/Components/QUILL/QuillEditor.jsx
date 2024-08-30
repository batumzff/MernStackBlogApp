import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useEffect,
} from "react";
import DOMPurify from "dompurify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { modules } from "../../Helpers/quillModules";
import style from "./QuillEditor.module.scss";

const QuillEditor = forwardRef(({ value, onChange }, ref) => {
  const [internalValue, setInternalValue] = useState(value || "");

  // Sync internal state with value prop when it changes
  useEffect(() => {
    if (value !== undefined && value !== internalValue) {
      setInternalValue(value);
    }
  }, [value]);

  // Handle changes in the editor
  const handleChange = (content, delta, source, editor) => {
    const sanitizedContent = DOMPurify.sanitize(content);
    console.log(sanitizedContent)
    setInternalValue(sanitizedContent);
    if (onChange) {
      onChange(sanitizedContent);
    }
  };

  // Expose methods through ref
  useImperativeHandle(ref, () => ({
    getValue: () => internalValue,
    setValue: (newValue) => {
      setInternalValue(DOMPurify.sanitize(newValue));
      if (onChange) {
        onChange(DOMPurify.sanitize(newValue));
      }
    },
    clear: () => setInternalValue(""),
  }));

  return (
    <section className={style.quill} data-test="quillEditor">
      <ReactQuill
        value={internalValue}
        onChange={handleChange}
        modules={modules}
        className={style.inner}
        style={{ 
          wordWrap: "break-word", 
          overflowWrap: "break-word", 
          wordBreak: "break-word", 
          whiteSpace: "normal" ,
          maxWidth:"100%",
        }}
      />
    </section>
  );
});

export default QuillEditor;

// import React, { useEffect, useRef, forwardRef } from "react";
// import DOMPurify from "dompurify";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import { modules } from "../../Helpers/quillModules";
// import style from "./QuillEditor.module.scss"

// // Forwarding the ref for accessing the Quill editor instance
// const QuillEditor = forwardRef(({ value }, ref) => {
//   const quillRef = useRef(null);

//   useEffect(() => {
//     if (quillRef.current) {
//       const editor = quillRef.current.getEditor();
//       if (value !== undefined && value !== editor.root.innerHTML) {
//         const currentContent = editor.root.innerHTML;

//         // Check if the content is different before setting it
//         if (value !== currentContent) {
//           const range = editor.getSelection(); // Get the current caret position
//           editor.root.innerHTML = value; // Set the new content
//           if (range) {
//             editor.setSelection(range); // Restore the caret position
//           }
//         }
//       }
//     }
//   }, [value]);

//   return (
//     <div className={style.quill}>

//       <ReactQuill
//       className={style.editor}
//         ref={(el) => {
//           quillRef.current = el;
//           if (ref) ref.current = el;
//         }}
//         theme="snow"
//         modules={modules}
//         defaultValue={value}
//       />
//     </div>
//   );
// });

// export default QuillEditor;