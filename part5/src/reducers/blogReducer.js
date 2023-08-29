import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';

const blogSlice = createSlice({
  name: 'blog',
  initialState: [],
  reducers: {
    setBlog(state, action) {
      console.log(JSON.parse(JSON.stringify(state)));
      return action.payload;
    },
  },
});

export const initializeBlogs = (handleError) => {
  return async (dispatch) => {
    try {
      const blogs = await blogService.getAll();
      dispatch(setBlog(blogs));
    } catch (error) {
      handleError();
    }
  };
};

export const { setBlog } = blogSlice.actions;
export default blogSlice.reducer;
