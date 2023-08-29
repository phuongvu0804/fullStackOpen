import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  type: 'info',
  content: null,
};

const notiSlice = createSlice({
  name: 'noti',
  initialState: initialState,
  reducers: {
    appendNoti(state, action) {
      return action.payload;
    },
    removeNoti(state) {
      return { ...state, content: null };
    },
  },
});

export const setNoti = (noti, timming = 5000) => {
  console.log('setNoti thunk', timming);
  return async (dispatch) => {
    console.log('running thunk');
    dispatch(appendNoti(noti));
    setTimeout(() => {
      dispatch(removeNoti());
    }, timming);
  };
};

export const { appendNoti, removeNoti } = notiSlice.actions;
export default notiSlice.reducer;
