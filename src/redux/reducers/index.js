import { combineReducers } from "@reduxjs/toolkit";

import authSlice from "./auth";
import productsSlice from "./products";
import confirmationSlice from "./confirmation";
import historySlice from "./history";
import checkoutSlice from "./checkout";
import feedSlice from "./feed";

export default combineReducers({
  auth: authSlice,
  products: productsSlice,
  confirmation: confirmationSlice,
  history: historySlice,
  checkout: checkoutSlice,
  feed: feedSlice,
});
