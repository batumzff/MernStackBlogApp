import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import useBlogData from "../../Custom-hooks/useBlogData";
import { LiaHeart } from "react-icons/lia";
import { FaTrashAlt } from "react-icons/fa";
import useAxios from "../../Custom-hooks/useAxios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import DOMPurify from "dompurify";
import { VscEdit } from "react-icons/vsc";
import BlogModal from "../../Components/BLOG-MODAL/BlogModal";
import detailStyle from "./BlogDetails.module.scss";
import BlogPost from "../../Components/BLOG-POST/BlogPost";
import EditCommentModal from "../../Components/EDIT-COMMENT-MODAL/EditCommentModal";
import axios from "axios";

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

  const navigate = useNavigate();

  console.log(blogDetail);

  useEffect(() => {
    getDetailPage("blogDetail", blogId);
    getLike("blogs", blogId);
    getComment("blogDetail", blogId);
  }, [likeStatus, editComment, commentModal]);
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
    // const content = sanitizedContent.replace(/<[^>]*>/g, "");
    const content = sanitizedContent;
    content !=="" && await postComment("comments", content, blogId);
    setComment("")
  };

  const handleDelete = () => {
    const data = axiosWithToken.delete(`blogs/${blogDetail?._id}`);
    navigate("/blogs");
  };
  let visitorCount = blogDetail?.countOfViews?.length;
  visitorCount = visitorCount == 0 ? 1 : visitorCount;

  const categoryId = blogDetail?.categoryId;
  console.log("blogDetail?.comments", blogDetail?.comments);

  const handleCommentEdit = async (id) => {
    console.log(id);
    setCommentModal((prev) => !prev);
    const check = blogDetail?.comments.filter((comment) => comment._id == id);

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
  console.log(editCommentID);
  console.log(editComment);
  // console.log("user", user);
  // console.log("blogId", blogId);
  return (
    <main className={detailStyle.main}>
      <section>
        <div className={detailStyle["detail-header"]}>
          <h2>{blogDetail?.title}</h2>

          <img src={blogDetail?.image} alt="blog-image" />
          <div className={detailStyle.likes}>
            <LiaHeart
              onClick={postLike}
              fill={`${blogDetail?.likes?.includes(user?.id) ? "red" : ""}`}
            />
            <span>{blogDetail?.totalLikes}</span>
          </div>
          {visitorCount && (
            <div className={detailStyle.views}>
              viewed by <span>{visitorCount} </span>
              <span>{visitorCount > 1 ? "people" : "person"}</span>
            </div>
          )}

          {(blogDetail?.userId?._id == user?.id ||
            user?.isAdmin == true ||
            user?.isStaff == true) && (
            <span className={detailStyle.modal}>
              <FaTrashAlt onClick={handleDelete} />
              <VscEdit onClick={() => setEditBlogModal(!editBlogModal)} />
            </span>
          )}
          {/* <p className={detailStyle.content}>{blogDetail?.content}</p> */}
          <BlogPost content={blogDetail?.content} />
        </div>

        <button
          data-test="showHideComments"
          className={detailStyle.button}
          onClick={() => setShow((prev) => !prev)}
        >
          {show ? "Hide" : "Show"} Comments
        </button>

        {show && (
          <div className={detailStyle.comment}>
            {/* <h4>{comments?.userId.username}</h4> */}
            {blogDetail?.comments?.filter(
              (comment) => comment.isDeleted == false
            ).length > 0 ? (
              blogDetail?.comments
                ?.filter((comment) => comment.isDeleted == false)
                .map((comment) => (
                  <div key={comment._id}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        height: "40px",
                      }}
                    >
                      {editComment ? (
                        <BlogPost
                          content={comment?.content}
                          edited={editComment}
                        />
                      ) : (
                        <BlogPost content={comment?.content} />
                      )}
                      {(user?.id == comment?.userId ||
                        user?.isAdmin ||
                        user?.isStaff) && (
                        <div>
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
                    </div>
                    <div style={{ border: "2px solid gray" }} />
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
          <ReactQuill
            className={detailStyle.quill}
            theme="snow"
            value={comment}
            onChange={setComment}
          />
        )}
        {show && !commentModal && (
          <button className={detailStyle.button} onClick={handleComment}>
            Add Your Comment
          </button>
        )}
      </section>
      {editBlogModal && (
        <BlogModal
          {...blogDetail}
          blogId={blogId}
          categoryId={categoryId}
          onClose={setEditBlogModal}
        />
      )}
      {commentModal && (
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
    </main>
  );
};

export default BlogDetails;
