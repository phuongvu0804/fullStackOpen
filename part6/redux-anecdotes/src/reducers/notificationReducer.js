import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name:'notification',
  initialState: '',
  reducers: {
    appendNotification(state, action) {
      return action.payload
    },
    removeNotification(state, action) {
      return null
    }
  }
})

export const setNotification = (noti, seconds) => {
  return async (dispatch) => {
    dispatch(appendNotification(noti))
    setTimeout(() => {
      dispatch(removeNotification(noti))
    }, seconds)
  }
}


export const { appendNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer