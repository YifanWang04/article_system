// User-related state management

import { createSlice } from "@reduxjs/toolkit";
import { request  } from "@/utils";
import { setToken as _setToken, getToken, removeToken } from "@/utils";

const userStore = createSlice({
  name: "user",
  // data state
  initialState: {
    token: getToken() || ''
  },
  // Synchronous modification method
  reducers: {
    setToken (state, action) {
      state.token = action.payload
      _setToken(action.payload)
    }
  }
})

const { setToken } = userStore.actions

// get reducer function
const userReducer = userStore.reducer

// Asynchronous method for obtaining token upon login
const fetchLogin = (loginForm) => {
  return async (dispatch)=> {
    // Send asynchronous requests
    const res = await request.post('/authorizations', loginForm)
    // Dispatch synchronous action to store token
    dispatch(setToken(res.data.token))
  }
}

export { fetchLogin, setToken }

export default userReducer
