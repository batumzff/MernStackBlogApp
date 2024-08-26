import React from "react";
import { useSelector } from "react-redux";
import { LiaHeart } from "react-icons/lia";
import { BsEye } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import style from "./CategoryDetail.module.scss"
import BlogCard from "../../Components/BLOG-CARD/BlogCard";

const CategoryDetail = () => {
  const { categoryDetail, blogs } = useSelector((state) => state.blog);
  const navigate = useNavigate()
  // console.log(categoryDetail);
  // console.log(blogs);

  const detail = blogs?.filter(
    (blog) => blog?.categoryId?._id == categoryDetail?._id
  );
  console.log(detail);
  return (
    <div className={style.main}>
      <div className={style.container}>
        {/* {detail?.map((item) => (
          <div className={style["detail-container"]} key={item._id} onClick={() =>navigate(`/blog-details/${item?._id}`)}>
            <h3>{item.title}</h3>
            <p>{item.content == "" ? "Not a blog found be the first " : item.content}</p>
            <div>
              <span>Author {item.userId?.username}</span>
              <span><LiaHeart/> {item.totalLikes}</span>
              <span><BsEye />{item.countOfViews?.length}</span>
            </div>
          </div>
        ))} */}
        <BlogCard/>
      </div>
    </div>
  );
};

export default CategoryDetail;
