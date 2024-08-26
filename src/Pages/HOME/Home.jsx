import React, { useEffect } from "react";
import useBlogData from "../../Custom-hooks/useBlogData";

import style from "./Home.module.scss";
import BlogCard from "../../Components/BLOG-CARD/BlogCard";

const Home = () => {
  const { getData } = useBlogData();

  useEffect(() => {
    getData();
  }, []);

  return (
    <main className={style["home-main"]}>
      
        <BlogCard />
     
    </main>
  );
};

export default Home;
