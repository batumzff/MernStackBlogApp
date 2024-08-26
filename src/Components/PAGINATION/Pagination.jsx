import React, { useEffect, useState } from "react";
import style from "./Pagination.module.scss";

const Pagination = ({ page, getData }) => {

  const [pageInfo, setPageInfo] = useState({
    previousPage: null,
    currentPage: 1,
    nextPage: null,
    totalPages: 1,
  });

  useEffect(() => {
    if (page?.pages) {
      setPageInfo({
        previousPage: page.pages.previous_page,
        currentPage: page.pages.current_page,
        nextPage: page.pages.next_page,
        totalPages: page.pages.total_pages,
      });
    }
  }, [page]);
  // console.log("page: ", page);
  // console.log("1: ", pageInfo.previousPage);
  // console.log("2: ", pageInfo.currentPage);
  // console.log("3: ", pageInfo.nextPage);
  // console.log("4: ", pageInfo.totalPages);

  const handlePage = (newPage) => {
    if (
      newPage !== pageInfo.currentPage &&
      newPage > 0 &&
      newPage <= pageInfo.totalPages
    ) {
      setPageInfo((prev) => ({
        ...prev,
        currentPage: newPage,
      }));
      getData("blogs", newPage);
    }
  };

  return (
    <section className={style.main}>
      <main className={style.container}>
        <button className={style["prev-next"]}
          disabled={!pageInfo.previousPage}
          onClick={() => handlePage(pageInfo.previousPage)}
        >
          Previous
        </button>

        <button className={style["current-page"]}>
          {pageInfo.currentPage}
        </button>

        {pageInfo.nextPage && (
          <button className={style["current-page"]} onClick={() => handlePage(pageInfo.nextPage)}>
            {pageInfo.nextPage}
          </button>
        )}

        {pageInfo.totalPages !== 1 &&
          pageInfo.currentPage !== pageInfo.totalPages && (
            <button className={style["current-page"]} onClick={() => handlePage(pageInfo.totalPages)}>
               ...{pageInfo.totalPages}
            </button>
          )}

        <button className={style["prev-next"]}
          disabled={
            !pageInfo.nextPage && !pageInfo.nextPage <= pageInfo.totalPages
          }
          onClick={() => handlePage(pageInfo.nextPage)}
        >
          Next
        </button>
      </main>
    </section>
  );
};

export default Pagination;