import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  all: {
    intro: {
      isVisible: true,
    },
    reward: {
      isVisible: true,
    },
  },
};

export const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    clearFeed: (prevState, action) => {
      return {
        ...prevState,
        all: action.payload,
      };
    },
  },
});

export const feedAction = {
  ...feedSlice.actions,
};

export default feedSlice.reducer;
