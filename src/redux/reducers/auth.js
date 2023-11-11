import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  login: {
    data: {
      username: null,
      role: null,
      id_user: null,
      password: null,
    },
    isLogin: false,
    msg: null,
  },
  allDataGuest: {
    data: [],
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (prevState, action) => {
      return {
        ...prevState,
        login: {
          data: action.payload,
          isLogin: true,
          msg: "Success login.",
        },
      };
    },
    logout: (prevState) => {
      return {
        ...prevState,
        login: {
          data: {
            username: null,
            role: null,
            id_user: null,
          },
          isLogin: false,
          msg: "Success logout",
        },
      };
    },
    retriveAllDataGuest: (prevState, action) => {
      return {
        ...prevState,
        allDataGuest: {
          data: action.payload,
        },
      };
    },
  },
});

export const authAction = {
  ...authSlice.actions,
};

export default authSlice.reducer;
