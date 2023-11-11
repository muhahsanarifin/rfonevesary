import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  addToCart: {
    data: [],
    isAddToCart: false,
  },
  order: {
    data: null,
    isOrder: false,
    msg: "Empty order",
  },
  addToCartSum: {
    data: null,
    isAddToCartSum: false,
  },
  orderSum: {
    data: null,
    isOrderSum: false,
  },
};

export const confirmationSlice = createSlice({
  name: "confirmation",
  initialState,
  reducers: {
    addToCart: (prevState, action) => {
      return {
        ...prevState,
        addToCart: {
          data: action.payload,
          isAddToCart: true,
        },
      };
    },
    clearAddToCartData: (prevState) => {
      return {
        ...prevState,
        addToCart: {
          data: [],
          isAddToCart: false,
        },
      };
    },
    deleteProductAddToCart: (prevState, action) => {
      return {
        ...prevState,
        addToCart: action.payload,
      };
    },
    order: (prevState, action) => {
      return {
        ...prevState,
        order: {
          data: action.payload,
          isOrder: true,
          msg: "Availabe order",
        },
      };
    },
    clearOrderData: (prevState) => {
      return {
        ...prevState,
        order: {
          data: null,
          isOrder: false,
          msg: "Empty order",
        },
      };
    },
    checkout: (prevState) => {
      return {
        ...prevState,
        order: {
          data: null,
          isOrder: false,
        },
      };
    },
    addToCartSum: (prevState, action) => {
      return {
        ...prevState,
        addToCartSum: {
          data: action.payload,
          isAddToCartSum: true,
        },
      };
    },
    orderSum: (prevState, action) => {
      return {
        ...prevState,
        orderSum: {
          data: action.payload,
          isOrderSum: true,
        },
      };
    },
  },
});

export const confirmationAction = {
  ...confirmationSlice.actions,
};

export default confirmationSlice.reducer;
