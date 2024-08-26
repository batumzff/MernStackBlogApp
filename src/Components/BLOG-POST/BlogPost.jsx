import React from "react";
import DOMPurify from "dompurify";
import style from "./BlogPost.module.scss"

const BlogPost = ({ content }) => {
  return (
    <div className={style.blogPost} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content, { USE_PROFILES: { html: true } }) }} />
  );
};

export default BlogPost;