import React, { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import BlogCard from "../../Components/BLOG-CARD/BlogCard";
import useBlogData from "../../Custom-hooks/useBlogData";
import style from "./CategoryDetail.module.scss";

const CategoryDetail = () => {
  const { categoryDetail, blogs } = useSelector((state) => state.blog);
  const { getCategoryById, getData } = useBlogData();
  const { categoryId } = useParams();

  useEffect(() => {
    // getData();
    getCategoryById("categoryDetail", categoryId);
  }, []);

  // console.log(categoryDetail);
  //   console.log(blogs);

  const detail = useMemo(() => {
    return blogs?.filter(
      (blog) =>
        blog?.categoryId?._id.toString() == categoryDetail?._id?.toString()
    );
  },[blogs, categoryId]);
  console.log(detail);
  return (
    <div className={style.main}>
      <div className={style.container}>
        <BlogCard detail={detail} />
      </div>
    </div>
  );
};

export default CategoryDetail;