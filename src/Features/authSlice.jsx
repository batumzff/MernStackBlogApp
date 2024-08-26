import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    id:"",
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    image: [],
    biography:"",
    isActive: "",
    isAdmin: "",
    isStaff: "",
  },
  loading: false,
  error: false,
  errorMessage: "",
  token: ""
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = false;
    },

    registerSuccess: (state, { payload }) => {
      state.loading = false;
      state.error = false;
      state.user = {
        ...state.user,
        username: payload.data.username,
        firstName: payload.data.firstName,
        lastName: payload.data.lastName,
        image: payload.data.image,
        email: payload.data.email,
        biography: payload.data.biography || "",
        id: payload.data._id,
        isActive: payload.data.isActive,
        isAdmin: payload.data.isAdmin,
        isStaff: payload.data.isStaff,

      };

      state.token = payload.token;
    },

    loginSuccess: (state, { payload }) => {
      state.loading = false;
      state.error = false;
      state.user = {
        ...state.user,
        username: payload?.user?.username,
        firstName: payload?.user?.firstName,
        lastName: payload?.user?.lastName,
        email: payload?.user?.email,
        image: payload?.user?.image,
        biography: payload?.user?.biography || "",
        id: payload?.user?._id,
        isActive: payload.user?.isActive,
        isAdmin: payload.user?.isAdmin,
        isStaff: payload.user?.isStaff,
      };

      state.token = payload?.token;
    },

    logoutSuccess: (state) => {
      state.error = false;
      state.loading = false;
      state.user = "";
      state.token = "";
    },

    updateUserInfo:(state,{payload})=> {
      state.loading = false;
      state.error = false;
      state.user = {
        ...state.user,
        username: payload?.username,
        firstName: payload?.firstName,
        lastName: payload?.lastName,
        email: payload?.email,
        image: payload?.image,
        biography: payload?.biography || "",
        id: payload?._id,
        isActive: payload?.isActive,
        isAdmin: payload?.isAdmin,
        isStaff: payload?.isStaff,
      };
    },

    fetchFail: (state, {payload}) => {
      state.loading = false;
      state.error = true;
      state.errorMessage = payload?.response?.data?.message
    },
    clearError: (state) => {
      state.error = false;
    },
  },
});

export const {
  fetchStart,
  fetchFail,
  loginSuccess,
  logoutSuccess,
  registerSuccess,
  updateUserInfo,
  clearError 
} = AuthSlice.actions;

export default AuthSlice.reducer;