import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import useBlogData from "../../Custom-hooks/useBlogData";
import { LiaHeart } from "react-icons/lia";
import { FaTrashAlt, FaEye } from "react-icons/fa";
import useAxios from "../../Custom-hooks/useAxios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import DOMPurify from "dompurify";
import { VscEdit } from "react-icons/vsc";
import BlogModal from "../../Components/BLOG-MODAL/BlogModal";
import style from "./BlogDetails.module.scss";
import BlogPost from "../../Components/BLOG-POST/BlogPost";
import EditCommentModal from "../../Components/EDIT-COMMENT-MODAL/EditCommentModal";
import axios from "axios";
import QuillEditor from "../../Components/QUILL/QuillEditor";
import { useMemo } from "react";

const BlogDetails = () => {
  const { blogDetail } = useSelector((state) => state.blog);
  const { user } = useSelector((state) => state.auth);
  const {
    getLike,
    updateComment,
    getDetailPage,
    postComment,
    deleteComment,
    getComment,
  } = useBlogData();
  const { blogId } = useParams();
  const [likeStatus, setLikeStatus] = useState("");
  const { axiosWithToken } = useAxios();

  const [show, setShow] = useState(false);
  const [comment, setComment] = useState("");
  const [editBlogModal, setEditBlogModal] = useState(false);
  const [editComment, setEditComment] = useState(blogDetail?.comments);
  const [editCommentID, setEditCommentID] = useState(null);

  const [commentModal, setCommentModal] = useState(false);

  const quillRef = useRef(null);
  const navigate = useNavigate();

  console.log(blogDetail);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        await Promise.all([
          getDetailPage("blogDetail", blogId),
          getLike("blogs", blogId),
        ]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchAllData();
  }, [likeStatus, editComment, blogId]);
  // console.log(blogId);
  const postLike = async () => {
    try {
      const data = await axiosWithToken.post(`blogs/${blogId}/postLike`);
      // console.log(data);
      setLikeStatus(data);
    } catch (error) {
      console.log("postLike error", error);
    }
  };

  const handleComment = async () => {
    const sanitizedContent = DOMPurify.sanitize(comment, {
      USE_PROFILES: { html: true },
    });
    const content = sanitizedContent;
    const innerElement = ["h1", "h2", "h3", "h4", "h5", "h6", "p"];
    const isEmptyContent = innerElement.some((tag) => {
      const emptyTagPattern = new RegExp(
        `<${tag}><br></${tag}>|<${tag}>\\s*</${tag}>`,
        "i"
      );
      return emptyTagPattern.test(content);
    });
    if (!isEmptyContent) {
      await postComment("comments", content, blogId);
      setComment("");
    }
  };

  const handleDelete = () => {
    const data = axiosWithToken.delete(`blogs/${blogDetail?._id}`);
    navigate("/blogs");
  };
  let visitorCount = useMemo(() => {
    return blogDetail?.countOfViews?.length;
  }, [blogDetail]);
  visitorCount = visitorCount == 0 ? 1 : visitorCount;

  const categoryId = blogDetail?.categoryId;
  console.log("blogDetail?.comments", blogDetail?.comments);

  const handleCommentEdit = async (id) => {
    console.log(id);
    setCommentModal(true);
    const check =  blogDetail?.comments.filter((comment) => comment._id == id);

    console.log(check);
    // console.log(check[0].content);
    
    setEditComment(check[0].content);
    setEditCommentID(id);
  };

  const handleCommentDelete = (commentId) => {
    try {
      console.log("delete run");
      deleteComment(commentId, blogId);
    } catch (error) {
      console.log(error);
    }
    console.log(commentId);
  };
  const showHideComments = () => {
    setShow((prev) => !prev);
  };

  console.log(editCommentID);
  console.log(editComment);
  // console.log("user", user);
  // console.log("blogId", blogId);
  return (
    <main className={style.main}>
      <section className={style.container}>
        <div className={style["detail-header"]}>
          <h2>{blogDetail?.title}</h2>

          <img src={blogDetail?.image} alt="blog-image" />
          <div className={style.info}>
            <div className={style["info-left"]}>
              <div className={style.likes}>
                <LiaHeart
                  onClick={postLike}
                  fill={`${blogDetail?.likes?.includes(user?.id) ? "red" : ""}`}
                />
                <span>{blogDetail?.totalLikes}</span>
              </div>

              {visitorCount && (
                <div className={style.views}>
                  <div>
                    <FaEye />
                  </div>
                  viewed by <span>{visitorCount} </span>
                  <span>{visitorCount > 1 ? "people" : "person"}</span>
                </div>
              )}
            </div>
            <div className={style["info-right"]}>
              <span>
                {new Date(blogDetail?.createdAt).toLocaleDateString()}
              </span>

              {(blogDetail?.userId?._id == user?.id ||
                user?.isAdmin == true ||
                user?.isStaff == true) && (
                <span className={style.modal}>
                  <FaTrashAlt onClick={handleDelete} />
                  <VscEdit onClick={() => setEditBlogModal(!editBlogModal)} />
                </span>
              )}
            </div>
          </div>

          <BlogPost content={blogDetail?.content} />
        </div>

        <button
          data-test="showHideComments"
          className={style.button}
          onClick={showHideComments}
        >
          {show ? "Hide" : "Show"} Comments
        </button>

        {show && (
          <div className={style.comment}>
            {/* <h4>{comments?.userId.username}</h4> */}
            {blogDetail?.comments?.filter(
              (comment) => comment.isDeleted == false
            ).length > 0 ? (
              blogDetail?.comments
                ?.filter((comment) => comment.isDeleted == false)
                .map((comment) => (
                  <div
                    className={style.comments}
                    key={comment._id}
                    style={{
                      display: "flex",
                      padding: "1rem",
                      borderBottom:"2px solid gray",
                      boxShadow:"0 8px 32px 0 rgba(92, 84, 112, 0.37)",
                      borderRadius:"5px",
                      margin:"6px",
                      backgroundColor:"#f0d5e9"
                    }}
                  >
                    <div style={{ width: "100%" }}>
                      {editComment ? (
                        <BlogPost
                          content={comment?.content}
                          edited={editComment}
                        />
                      ) : (
                        <BlogPost content={comment?.content} />
                      )}
                    </div>
                    {(user?.id == comment?.userId ||
                      user?.isAdmin ||
                      user?.isStaff) && (
                      <div style={{ width: "100%", textAlign: "right" }}>
                        <FaTrashAlt
                          onClick={() => handleCommentDelete(comment?._id)}
                          color="red"
                        />
                        <VscEdit
                          onClick={() => handleCommentEdit(comment?._id)}
                          color="green"
                        />
                      </div>
                    )}
                    {/* <div style={{ border: "2px solid gray" }} /> */}
                  </div>
                ))
            ) : (
              <div>
                <h4>Add first comment</h4>
              </div>
            )}
          </div>
        )}

        {show && !commentModal && (
          <QuillEditor  value={comment} onChange={setComment} />
        )}

        {show && !commentModal && (
          <button className={style.button} onClick={handleComment}>
            Add Your Comment
          </button>
        )}
        {editBlogModal && (
          <BlogModal
            {...blogDetail}
            blogId={blogId}
            categoryId={categoryId}
            onClose={setEditBlogModal}
          />
        )}
        {commentModal && show && (
          <EditCommentModal
            {...blogDetail}
            setEditComment={setEditComment}
            editComment={editComment}
            id={editCommentID}
            onClose={setCommentModal}
            userId={user?.id}
            blogId={blogId}
            updateComment={updateComment}
          />
        )}
      </section>
    </main>
  );
};

export default BlogDetails;
