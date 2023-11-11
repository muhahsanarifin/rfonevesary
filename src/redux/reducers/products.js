import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  get: {
    data: null,
    msg: "Success get product data",
  },
};

export const productsSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    get: (prevState, action) => {
      return {
        ...prevState,
        get: {
          data: action.payload,
          msg: "Success get product data",
        },
      };
    },
  },
});

export const productsAction = {
  ...productsSlice.actions,
};

export default productsSlice.reducer;
