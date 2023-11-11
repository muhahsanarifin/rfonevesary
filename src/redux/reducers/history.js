import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  order: {
    data: [],
    isOrder: false,
    msg: "No order history",
  },
  detail: {
    products: [],
    isDetail: false,
    msg: "No detail order history",
  },
};

export const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    order: (prevState, action) => {
      return {
        ...prevState,
        order: {
          data: action.payload,
          isOrder: true,
          msg: "Exist order history",
        },
      };
    },
    detail: (prevState, action) => {
      return {
        ...prevState,
        detail: {
          products: action.payload,
          isDetail: true,
          msg: "Exist detail history",
        },
      };
    },
  },
});

export const historyAction = {
  ...historySlice.actions,
};

export default historySlice.reducer;
