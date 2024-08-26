import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  categories: [],
  blogs: [],
  comments: [],
  blogDetail: {},
  categoryDetail: [],
  details: {},
  loading: false,
  error: false,
};

const BlogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = false;
    },

    getAllData: (state, { payload }) => {
      state.loading = false;
      state.error = false;
      state.users = payload[0];
      state.categories = payload[1];
      state.blogs = payload[2];
      // state.comments = payload[3];
      console.log(payload[2])
    },

    getSingleData: (state, { payload }) => {
      state.loading = false;
      state.error = false;
      if(payload.data && typeof payload.data == "object" && "updatedData" in payload.data ){ state[payload.url] = payload.data.updatedData
        console.log(payload.data.updatedData)
      }
      // else if(payload["updatedData"]) { state[payload.url] = payload.updatedData
      //   console.log("elseif",payload.updatedData)
      // }

      else {
        state[payload.url] = payload?.data.data
        state.details = payload?.data?.details
        console.log("details",payload?.data?.details)
        console.log("payload",payload)
        console.log("payload.data",payload.data)
        // console.log("payload.data.data",payload.data.data)
      }
    },

    fetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const { fetchStart, fetchFail, getAllData, getSingleData } =
  BlogSlice.actions;

export default BlogSlice.reducer;
