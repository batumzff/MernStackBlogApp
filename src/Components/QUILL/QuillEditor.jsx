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
      />
    </section>
  );
});

export default QuillEditor;