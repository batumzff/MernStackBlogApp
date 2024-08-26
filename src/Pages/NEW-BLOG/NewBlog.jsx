import React, { useState } from "react";
import useAxios from "../../Custom-hooks/useAxios";
import BlogModal from "../../Components/BLOG-MODAL/BlogModal";
import style from "./NewBlog.module.scss";
import { useLocation } from "react-router-dom";

const NewBlog = () => {
  const { axiosWithToken } = useAxios();
  const [show, setShow] = useState(false)

  const location = useLocation()
  const { from } = location.state || {}

  console.log(from);
  const postBlog = async (url, postData) => {
    try {
      const { data } = await axiosWithToken.post(`${url}/`, postData);
    } catch (error) {
      console.log(error);
    }
  };

  

  return (
    <section className={style["new-blog-main"]}>
      
        <div>
          <BlogModal postBlog={postBlog} onClose={setShow} location={from} />
        </div>
      
    </section>
  );
};

export default NewBlog;