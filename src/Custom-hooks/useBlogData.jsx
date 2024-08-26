import useAxios from "./useAxios";
import { useDispatch } from "react-redux";
import {
  fetchFail,
  fetchStart,
  getAllData,
  getSingleData,
} from "../Features/BlogSlice";

const useBlogData = () => {
  const { axiosWithToken, axiosPublic } = useAxios();
  const dispatch = useDispatch();

  const getAllBlogData = async () => {
    dispatch(fetchStart());

    try {
      const [users, categories, blogs, comments] = await Promise.all([
        axiosWithToken("users?limit=20"),
        axiosWithToken("categories"),
        axiosWithToken("blogs?limit=20&sort[createdAt]=desc"),
        // axiosWithToken("comments"),
      ]);

      dispatch(
        getAllData([
          users?.data?.data,
          categories?.data?.data,
          blogs?.data?.data,
          // comments?.data?.data,
        ])
      );
    } catch (error) {
      dispatch(fetchFail());
      console.log(error);
    }
  };

  const getData = async (url = "blogs",page = 1) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosPublic(`${url}?limit=8&skip=${(page -1) * 8}&sort[createdAt]=desc&page=${page}`);
      dispatch(getSingleData({ data, url }));
    } catch (error) {
      dispatch(fetchFail());
      console.log(error);
    }
  };

  const getLike = async (url,blogId) => {
    // console.log(url);
    // console.log(blogId);
    dispatch(fetchStart());
    try {
      const { data }  = await axiosWithToken.get(`blogs/${blogId}/getLike`);
      // console.log(data);
      dispatch(getSingleData({ data, url }));
    } catch (error) {
      dispatch(fetchFail());
      console.log(error);
    }
  }

 const getDetailPage = async (url, blogId) => {
  // console.log("********************");
  // console.log(url);
  // console.log(blogId);
  // console.log("********************");

  dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.get(`blogs/${blogId}`);
      // console.log(data);
      dispatch(getSingleData({ data, url }));
    } catch (error) {
      dispatch(fetchFail());
      console.log(error);
    }
 }

 const postComment = async (url,content,blogId) => {
  dispatch(fetchStart())
  try {
    const { data } = await axiosWithToken.post(url,{content, blogId})
    getComment("blogDetail",blogId)
  } catch (error) {
    dispatch(fetchFail())
  }
     
 }

 const getComment = async (url, blogId) => {
  dispatch(fetchStart());
  try {
    const { data } = await axiosWithToken.get(`blogs/${blogId}`);
    // console.log("comment-data in getComment",data);
    dispatch(getSingleData({ data, url }));
  } catch (error) {
    dispatch(fetchFail());
    console.log(error);
  }
 }

 const updateComment = async (url, commentId,blogId,updateData) => {
  console.log("updateComment",url);
  console.log("updateComment",commentId);
  console.log(updateData);
  dispatch(fetchStart());
  try {
    const { updatedData} = await axiosWithToken.put(`comments/${commentId}`,updateData);
   
    getComment("blogDetail",blogId)
    
     
    console.log(updatedData)
  } catch (error) {
    dispatch(fetchFail());
    console.log(error);
  }

 }

 const deleteComment = async (commentId,blogId) => {
  console.log(commentId);
  console.log(blogId);
  dispatch(fetchStart());
  try {
    const {data} = await axiosWithToken.delete(`comments/${commentId}`,blogId)
    console.log(data);
    getComment("blogDetail",blogId)
  } catch (error) {
    dispatch(fetchFail());
    console.log(error);
  }
  }

 const getCategoryById = async (url, categoryId) => {
  // console.log(categoryId);
  // console.log(url);
  dispatch(fetchStart());
  try {
    // const { data } = await axiosWithToken.get(`categories/${categoryId}`);
    const { data } = await axiosWithToken.get(`categories/${categoryId}`);
    // console.log("category detail",data);
    dispatch(getSingleData({ data, url }));
  } catch (error) {
    dispatch(fetchFail());
    console.log(error);
  }
 }

//  const deleteBlog = async (url, blogId) => {
//   // console.log(blogId);
//   // console.log(url);
//   dispatch(fetchStart());
//   try {
//     const { data } = await axiosWithToken.delete(`${url}/${blogId}`);
//     // console.log("category detail",data);
//     dispatch(getSingleData({ data, url }));
//   } catch (error) {
//     dispatch(fetchFail());
//     console.log(error);
//   }
//  }

const putBlog = async (url,blogId, postData) => {
  // console.log(url);
  // console.log(blogId);
  // console.log(postData);
  try {
    const { data } = await axiosWithToken.put(`blogs/${blogId}`, postData);
    // console.log(data)
    dispatch(getSingleData({url, data}))
  } catch (error) {
    console.log(error);
    dispatch(fetchFail());
  }
};

  return { getAllBlogData, updateComment, getData, getLike, getDetailPage, getComment, postComment, getCategoryById, putBlog, deleteComment };
};

export default useBlogData;
