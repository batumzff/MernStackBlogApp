import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useBlogData from "../../Custom-hooks/useBlogData";
import { useNavigate } from "react-router-dom";
import categoriesStyle from "./Categories.module.scss";
import useAxios from "../../Custom-hooks/useAxios";
import { VscEdit } from "react-icons/vsc";

const Categories = () => {
  const { categories } = useSelector((state) => state.blog);
  const { user } = useSelector((state) => state.auth);
  const { getData, getCategoryById } = useBlogData();
  const { axiosWithToken } = useAxios();
  const navigate = useNavigate();
  const [add, setAdd] = useState("");
  const [edit, setEdit] = useState(false);
  const [editId, setEditId] = useState("");

  useEffect(() => {
    getData("categories");
  }, []);
  // console.log(categories);
  // console.log(user);

  const handleClick = async (categoryId) => {
    // console.log(categoryId);
    try {
      const data = await getCategoryById("categoryDetail", categoryId);
      // console.log(data);
      navigate("/category-detail");
    } catch (error) {
      console.log(error);
    }
  };
  const addCategory = async (e) => {
    e.preventDefault();
    const postData = { name: add };
    const data = await axiosWithToken.post("categories", postData);
    // console.log(data)
    getData("categories");
  };
  // console.log(add)

  const handleEditChange = (id) => {
    setEdit(true);
    const info = categories.filter((category) => category._id == id);
    // console.log(info);
    // console.log(info[0]._id)
    let name = info[0].name;
    // console.log(name);
    setAdd(name);
    setEditId(info[0]._id);
  };
  // console.log(add)
  const handleCategoryEdit = async () => {
    const postData = { categoryId: editId, name: add };
    // console.log(postData);

    const data = await axiosWithToken.put(`categories/${editId}`, postData);
    // console.log(data);
    getData("categories");
    setAdd("");
    setEdit(false);
  };

  return (
    <div className={categoriesStyle.container}>
      <div>
        <h3>Your site Your Choice</h3>
        <div className={categoriesStyle.categories}>
          {categories?.map((category) => (
            <div key={category._id}>
              <h3 onClick={() => handleClick(category._id)}>
                {category.name}{" "}
              </h3>
              {(user?.isAdmin || user?.isStaff) && (
                <span>
                  <VscEdit
                    onClick={() => handleEditChange(category?._id)}
                    color="green"
                  />
                </span>
              )}{" "}
            </div>
          ))}
        </div>
        <div>
          <input
            type="text"
            name="category"
            value={add}
            onChange={(e) => setAdd(e.target.value)}
          />
          {
            <button
              onClick={edit ? handleEdit : addCategory}
              disabled={add.trim() == "" && "disabled"}
            >
              {edit ? "Edit Category" : "Add Category"}
            </button>
          }
        </div>
      </div>
    </div>
  );
};

export default Categories;
