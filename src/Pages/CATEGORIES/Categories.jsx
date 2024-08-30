import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useBlogData from "../../Custom-hooks/useBlogData";
import ErrorPage from "../../Components/ERROR-PAGE/ErrorPage";
import { useNavigate } from "react-router-dom";
import { VscEdit } from "react-icons/vsc";
import useAxios from "../../Custom-hooks/useAxios";
import useDebounce from "../../Custom-hooks/useDebounce";
import { fetchFail } from "../../Features/BlogSlice";
import style from "./Categories.module.scss";

const Categories = () => {
  const { user, token } = useSelector((state) => state.auth);
  const { categories, blogErrorMessage, error} = useSelector(
    (state) => state.blog
  );
  const dispatch = useDispatch()
  const { getData, getCategoryById } = useBlogData();
  const { axiosWithToken } = useAxios();
  const [categoryId, setCategoryId] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [edit, setEdit] = useState(false);
  const navigate = useNavigate();

  const debouncedName = useDebounce(categoryName, 500);

  useEffect(() => {
    getData("categories");
  }, []);
  // console.log(categories);
  // console.log(user);

  const handleClick = async (categoryId) => {
    // console.log(categoryId);
    setCategoryId(categoryId);
    try {
      const data = await getCategoryById("categoryDetail", categoryId);
      // console.log(data);
      navigate(`/category-detail/${categoryId}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setCategoryName(e.target.value);
  };

  const addCategory = async () => {
    console.log(categoryName);

    const postData = { name: debouncedName };
    try {
      const data = await axiosWithToken.post("categories", postData);
    console.log(data);
    getData("categories");
    setCategoryName("");
    } catch (error) {
      console.log(error);
      dispatch(fetchFail(error))
    }
    
  };

  const getEditInfo = async (id, name) => {
    setEdit(true);
    setCategoryName(name);
    setCategoryId(id);
    console.log(id);
    console.log(name);
  };

  const handleEdit = async () => {
    const postData = { categoryId, name: categoryName };
    console.log(postData);
    const { data } = await axiosWithToken.put(
      `categories/${categoryId}`,
      postData
    );
    console.log(data);
    getData("categories");
    setEdit(false);
    setCategoryName("");
  };

  // console.log(categoryId);
  // console.log(categoryName);

  return (
    <section className={style.container}>
      <main>
        <h3>Your site Your Choice</h3>
        <section className={style.categories}>
          {error ? (
            <ErrorPage msg={blogErrorMessage} blogError={error} />
          ) : (
            categories?.map((category) => (
              <React.Fragment key={category._id}>
                <h3 onClick={() => handleClick(category._id)}>
                  {category.name}{" "}
                </h3>
                {user && (user.isAdmin || user.isStaff) && (
                  <div onClick={() => getEditInfo(category._id, category.name)}>
                    <VscEdit />
                  </div>
                )}
              </React.Fragment>
            ))
          )}
        </section>
        <section className={style.add}>
          <h4>{edit ? "Edit Category" : "Add Category"}</h4>
          {token && (
            <>
              <input type="text" value={categoryName} onChange={handleChange} />
              <button
                onClick={edit ? handleEdit : addCategory}
                disabled={categoryName.trim() == "" && "disabled"}
              >
                {edit ? "Edit Category" : "Add Category"}
              </button>
            </>
          )}
        </section>
      </main>
    </section>
  );
};

export default Categories;