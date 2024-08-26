import React from "react";

import BlogCard from "../../Components/BLOG-CARD/BlogCard";
import style from "./Blogs.module.scss"

const Blogs = () => {
  return (
    <div className={style.main}>
      <BlogCard />
    </div>
  );
};

export default Blogs;
