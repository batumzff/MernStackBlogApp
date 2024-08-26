import { useDispatch } from "react-redux";
import useAxios from "./useAxios";
import {
  fetchFail,
  fetchStart,
  loginSuccess,
  logoutSuccess,
  registerSuccess,
  updateUserInfo,
} from "../Features/authSlice";
import { useNavigate } from "react-router-dom";

const useAuthCalls = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { axiosPublic, axiosWithToken } = useAxios();

  const registerUser = async (userInfo) => {
    dispatch(fetchStart());

    try {
      const { data } = await axiosPublic.post("users/", userInfo);
      dispatch(registerSuccess(data));
      navigate("/blogs");
    } catch (error) {
      dispatch(fetchFail());
      console.log(error);
    }
  };

  const login = async (userInfo) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosPublic.post("auth/login", userInfo);
      console.log(data.user);
      dispatch(loginSuccess(data));
      navigate("/blogs");
    } catch (error) {
      dispatch(fetchFail());
      console.log(error);
    }
  };

  const logout = async () => {
    try {
      await axiosWithToken.get("auth/logout");
      dispatch(logoutSuccess());
      navigate("/");
    } catch (error) {
      dispatch(fetchFail());
      console.log(error);
    }
  };

  const updatedUser = async (userId, info) => {
    console.log(userId);
    console.log(info);
    try {
      const { data } = await axiosWithToken.put(`users/${userId}`, info);
      console.log(data.updatedData);
      dispatch(updateUserInfo(data.updatedData));
      navigate("/my-profile");
    } catch (error) {
      dispatch(fetchFail());
      console.log(error);
    }
  };

  return { registerUser, login, logout, updatedUser };
};

export default useAuthCalls;
