import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  addToCart: {
    data: [],
    isAddToCart: false,
    msg: "",
  },
  order: {
    data: [],
    isOrder: false,
    msg: "",
  },
};

export const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    addToCart: (prevState, action) => {
      return {
        ...prevState,
        addToCart: {
          data: action.payload,
          isAddToCart: true,
          msg: "Sucess Order",
        },
      };
    },
    clearAddToCartData: (prevState) => {
      return {
        ...prevState,
        addToCart: {
          data: [],
          isAddToCart: false,
          msg: "",
        },
      };
    },
    order: (prevState, action) => {
      return {
        ...prevState,
        order: {
          data: action.payload,
          isOrder: true,
          msg: "Success Order",
        },
      };
    },
    clearOrderData: (prevState) => {
      return {
        ...prevState,
        order: {
          data: [],
          isOrder: false,
          msg: "",
        },
      };
    },
  },
});

export const checkoutAction = {
  ...checkoutSlice.actions,
};

export default checkoutSlice.reducer;
