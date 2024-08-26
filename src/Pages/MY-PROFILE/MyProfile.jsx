import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import useAuthCalls from "../../Custom-hooks/useAuthCalls";
import DOMPurify from "dompurify";
import BlogPost from "../../Components/BLOG-POST/BlogPost";
import QuillEditor from "../../Components/QUILL/QuillEditor";
import { formRegisterInputs } from "../../Helpers/formInputs";
import useBlogData from "../../Custom-hooks/useBlogData";
import BlogCard from "../../Components/BLOG-CARD/BlogCard";
import { useNavigate } from "react-router-dom";
import style from "./MyProfile.module.scss";

const MyProfile = () => {
  const { updatedUser } = useAuthCalls();
  const { user } = useSelector((state) => state.auth);
  const { blogs, details } = useSelector((state) => state.blog);

  const [show, setShow] = useState(false);
  const [userModal, setUserModal] = useState(false);
  const quillRef = useRef(user?.biography);

  const navigate = useNavigate();

  const inputRefs = useRef({
    username: user?.username,
    firstName: user?.firstName,
    lastName: user?.lastName,
    email: user?.email,
    image: user?.image || [],
    biography: user?.biography || "",
    password: "",
  });

  const { getData } = useBlogData();
  useEffect(() => {
    getData("blogs");
  }, []);

  const userBlogs = blogs?.filter((blog) => blog.userId._id == user?.id);

  console.log(userBlogs);

  // console.log(user);
  // console.log(blogs);
  console.log(details);

  const handleForm = (e) => {
    const { name, value } = e.target;
    inputRefs.current[name] = value;
  };
  // console.log(user);

  const handleSubmit = (e) => {
    e.preventDefault();
    const sanitizedContent = DOMPurify.sanitize(
      quillRef.current.getEditor().root.innerHTML,
      {
        USE_PROFILES: { html: true },
      }
    );
    const userInfo = {
      ...inputRefs.current,
      biography: sanitizedContent,
    };
    const userId = user?.id;
    updatedUser(userId, userInfo);
    // inputRefs.current = ""
    setUserModal(false);
  };

  const handleButtons = (e) => {
    // console.log(e.target.textContent);
    const { textContent } = e.target;

    switch (textContent) {
      case "Edit Profile":
        setUserModal(true);
        setShow(false);
        break;

      case "My Blogs":
        setUserModal(false);
        setShow(true);
        break;

      case "X":
        setUserModal(false);
        setShow(false);
        break;

      default:
        setUserModal(false);
        setShow(false);
        break;
    }
  };

  const handleNavigate = () => {
    navigate("/new-blog", { state: { from: "MyProfile" } });
  };

  const handlePage = (e) => {
    const page = e.target.textContent;
    getData("blogs", page);
  };
  console.log(details?.pages?.total_pages);
  return (
    <main className={style.main}>
      <section className={style["profile-header"]}>
        <img
          src={
            (Array.isArray(user?.image) && user?.image[0]) ||
            "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
          }
          alt="user photo"
        />
        <h2>{user?.username}</h2>
      </section>
      <section className={style["profile-body"]}>
        <BlogPost content={user?.biography} />
      </section>

      <button onClick={handleButtons}>Edit Profile</button>
      <button onClick={handleButtons}>My Blogs</button>

      {userModal && (
        <section>
          <form onSubmit={handleSubmit}>
            <span className={style.close} onClick={handleButtons}>
              X
            </span>
            {formRegisterInputs.map(
              (item) =>
                item.name !== "biography" && (
                  <React.Fragment key={item.name}>
                    <label htmlFor={item.name}>{item.label}</label>
                    <input
                      type={item.type}
                      id={item.name}
                      name={item.name}
                      defaultValue={inputRefs.current[item.name]}
                      onChange={handleForm}
                      required={item.type === "password"}
                    />
                  </React.Fragment>
                )
            )}

            <label htmlFor="biography">Biography</label>
            <QuillEditor
              name="quill"
              value={inputRefs.current?.biography}
              ref={quillRef}
              style={{ color: "black" }}
            />

            <button>Submit</button>
          </form>
        </section>
      )}
      {show && (
        <section
          className={userBlogs?.length == 0 ? style["no-content"] : style.blogs}
        >
          {userBlogs?.length !== 0 ? (
            // <BlogCard detail={userBlogs} />
            <div className={style["profile-cards"]}>
               <span className={style.close} onClick={handleButtons}>
              X
            </span>
              <BlogCard />
            </div>
          ) : !details?.page && userBlogs.length == 0 ? (
            <button onClick={handleNavigate} className={style["span-message"]}>
              Add Your First Blog
            </button>
          ) : (
            <button onClick={handlePage} className={style["previous-page"]}>
              {details?.pages?.previous_page}
            </button>
          )}
        </section>
      )}
    </main>
  );
};

export default MyProfile;