import React, { useEffect, useState } from "react";
import useBlogData from "../../Custom-hooks/useBlogData";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import style from "./BlogCard.module.scss";
import Pagination from "../PAGINATION/Pagination";


const BlogCard = ({detail}) => {
  const { getData } = useBlogData();
  const {  blogs, details  } = useSelector((state) => state.blog);

  useEffect(() => {
    getData();
  }, []);

  // console.log(details);
  // console.log(details?.pages?.current_page);
  console.log(detail);

  return (
    <section className={style.container}>
      <main className={style.main}>
        {
          detail ? detail?.map((item) =>(
            <div key={item._id} className={style["card-container"]}>
            <Link
              to={`/blog-details/${item?._id}`}
              className={style["card-link"]}
            >
              <div className={`${style.card} ${style["card-img"]}`}>
                <div className={style["card-img"]} />

                <div
                  data-test="blogDetailButton"
                  className={style["card-img-hovered"]}
                  style={{
                    backgroundImage: `url(${item?.image[0]})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center center",
                    backgroundSize: "cover",
                  }}
                />

                <div className={style["card-info"]}>
                  <div className={style["card-about"]}>
                    <span className={style["card-tag tag-news"]}>
                      {item.categoryId.name}
                    </span>
                    <div className={style["card-time"]}>
                      {item?.createdAt
                        ? new Date(item.createdAt).toLocaleDateString()
                        : ""}
                    </div>
                  </div>
                  <h2 className={style["card-title"]}>{item?.title}</h2>
                  <div className={style["card-creator"]}>
                    by <span>{item.userId.firstName}</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
          )) :
        blogs?.map((blog) => (
          <div key={blog._id} className={style["card-container"]}>
            <Link
              to={`/blog-details/${blog?._id}`}
              className={style["card-link"]}
            >
              <div className={`${style.card} ${style["card-img"]}`}>
                <div className={style["card-img"]} />

                <div
                  data-test="blogDetailButton"
                  className={style["card-img-hovered"]}
                  style={{
                    backgroundImage: `url(${blog?.image[0]})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center center",
                    backgroundSize: "cover",
                  }}
                />

                <div className={style["card-info"]}>
                  <div className={style["card-about"]}>
                    <span className={style["card-tag tag-news"]}>
                      {blog.categoryId.name}
                    </span>
                    <div className={style["card-time"]}>
                      {blog?.createdAt
                        ? new Date(blog.createdAt).toLocaleDateString()
                        : ""}
                    </div>
                  </div>
                  <h2 className={style["card-title"]}>{blog?.title}</h2>
                  <div className={style["card-creator"]}>
                    by <span>{blog.userId.firstName}</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))
        }
      </main>
      <section className={style.page}>
        <Pagination page={details} getData={getData} />
      </section>
    </section>
  );
};

export default BlogCard;
