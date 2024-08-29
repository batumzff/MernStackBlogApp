import React from "react";
import "react-quill/dist/quill.snow.css";
import DOMPurify from "dompurify";
import style from "../../Pages/BLOG-DETAILS/BlogDetails.module.scss";
import useDebounce from "../../Custom-hooks/useDebounce";
import QuillEditor from "../QUILL/QuillEditor";
import edit from "./EditCommentModal.module.scss"

const EditCommentModal = ({
  editComment,
  setEditComment,
  onClose,
  id,
  blogId,
  userId,
  updateComment,
}) => {
  // console.log("edit comment", editComment);
  // console.log(id);

  
  const debouncedValue = useDebounce(editComment);

  const handleEdit = () => {
    // console.log(editComment);
    console.log(debouncedValue);

    // const sanitizedContent = DOMPurify.sanitize(editComment, { USE_PROFILES: { html: true } });
    const sanitizedContent = DOMPurify.sanitize(debouncedValue, {
      USE_PROFILES: { html: true },
    });
    const content = sanitizedContent;
    console.log(content);
    const editCommentData = {
      content,
      blogId,
      userId,
    };

    updateComment("blogDetail", id, blogId, editCommentData);

    onClose();
  };

  // console.log(editComment);
  console.log(debouncedValue);
  return (
    <main className={edit.container}>
      <section className={edit.editor}>
        <QuillEditor value={editComment} onChange={setEditComment} />
      </section>
      <div>

      <button
        className={style.button}
        onClick={handleEdit}
        
      >
        Submit
      </button>
      <button
        className={style.button}
        onClick={() => onClose()}
        style={{  backgroundColor: "red" }}
      >
        Cancel
      </button>
      </div>
    </main>
  );
};

export default EditCommentModal;