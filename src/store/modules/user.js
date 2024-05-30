// User-related state management

import { createSlice } from "@reduxjs/toolkit";
import { request  } from "@/utils";
import { setToken as _setToken, getToken, removeToken } from "@/utils";
import { loginAPI, getProfileAPI } from '@/apis/user'

const userStore = createSlice({
  name: "user",
  // data state
  initialState: {
    token: getToken() || '',
    userInfo: {}
  },
  // Synchronous modification method
  reducers: {
    setToken (state, action) {
      state.token = action.payload
      _setToken(action.payload)
    },
    setUserInfo (state, action) {
      state.userInfo = action.payload
    },
    clearUserInfo (state) {
      state.token = ''
      state.userInfo = {}
      removeToken()
    }
  }
})

const { setToken, setUserInfo, clearUserInfo } = userStore.actions

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

// Asynchronous method to retrieve personal user information
const fetchUserInfo = () => {
  return async (dispatch) => {
    const res = await getProfileAPI()
    dispatch(setUserInfo(res.data))
  }
}

export { fetchLogin, fetchUserInfo, clearUserInfo, setToken }

export default userReducer
