import React, { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import { modules } from "../../Helpers/quillModules";
import { useSelector } from "react-redux";
import DOMPurify from "dompurify";
import useBlogData from "../../Custom-hooks/useBlogData";
import useAxios from "../../Custom-hooks/useAxios";
import { useNavigate } from "react-router-dom";
import BlogPost from "../BLOG-POST/BlogPost";
import style from "./BlogModal.module.scss";
import QuillEditor from "../QUILL/QuillEditor";

const BlogModal = ({
  title,
  image,
  isPublish,
  blogId,
  content,
  categoryId,
  onClose,
  postBlog,
  location
}) => {
  const { categories } = useSelector((state) => state.blog);
  const { user } = useSelector((state) => state.auth);
  const { getData, putBlog } = useBlogData();
  const navigate = useNavigate();

  const [open, setOpen] = useState(true);
  const [inputs, setInputs] = useState({
    title,
    image,
    categories:categoryId,
    isPublish,
    userId: user?.id,
  });
  // const [text, setText] = useState(content);
  const quillRef = useRef("")

  useEffect(() => {
    getData("categories");
  }, []);

  
  const handleForm = (e) => {
    const { name, value } = e.target;

    setInputs({
      ...inputs,
      [name]: value,
    });
  };

console.log(inputs);
  const handleSubmit =  (e) => {
    e.preventDefault();
    const sanitizedContent = DOMPurify.sanitize(quillRef.current.value, { USE_PROFILES: { html: true } });
    console.log(quillRef.current.value);
    const postData = {
      ...inputs,
      content: sanitizedContent,
      // categories: categoryId
    };
    console.log(postData);
    blogId ? putBlog("blogDetail",blogId, postData) : postBlog("blogs", postData)
    setInputs({ title: "", image: "", categoryId: "", isPublish: "" });
    // setText("");
    onClose()
   blogId ? navigate(`/blog-details/${blogId}`) : navigate("/blogs")
  };

  const categoryName = (categories?.filter(
    (category) => category._id == categoryId
  ))[0]?.name;

  console.log(location);
const handleClose = () => {
  location == "MyProfile" ? navigate("/my-profile") : onClose(false)
}

  return (
    <section className={style["modal-main"]}>
      {open && (
        <main className={style["modal"]}>
          <form onSubmit={handleSubmit}>
            <section className={style["input-group"]}>
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={inputs.title}
                onChange={handleForm}
              />
            </section>
            <section  className={style.quill}>
              <label htmlFor="content">Content</label>
              <QuillEditor value={content} ref={quillRef} />
            </section>
            <section className={style["input-group"]}>
              <label htmlFor="image">Image Url</label>
              <input
                type="text"
                id="image"
                name="image"
                value={inputs.image}
                onChange={handleForm}
              />
            </section>
            <section className={style["input-group"]}>
              <select
                name="categories"
                id="categories"
                value={inputs.categories}
                onChange={handleForm}
              >
                <option value="" >Select Category</option>
                <option value={categoryId}>{categoryName}</option>
                {categories?.map((category) => (
                  <option value={category._id}>
                    {/* {category.name == categoryName ? "" : category.name} */}
                    {category.name}
                  </option>
                ))}
              </select>
            </section>
            <section className={style["input-group"]}>
              <select
                name="isPublish"
                id="isPublish"
                value={inputs.isPublish}
                onChange={handleForm}
              >
                <option value="">Select Publish Status</option>
                <option value="true">Publish</option>
                <option value="false">Draft</option>
              </select>
            </section>
            <section className={style.button}>
             <button>Submit</button>
            {/* <button style={{ backgroundColor:"#ED0800"}} onClick={()=> onClose(false)}>Close</button>   */}
            <button style={{ backgroundColor:"#ED0800"}} onClick={handleClose}>Close</button>  
            </section>
           
          </form>
        </main>
      )}
    </section>
  );
};

export default BlogModal;