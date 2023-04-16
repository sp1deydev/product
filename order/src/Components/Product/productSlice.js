import { createSlice } from "@reduxjs/toolkit";
import Products from '../../Constants/Products';
console.log("Products on slice:",Products);
const productsSlide = createSlice({
  name: "products",
  initialState: Products,
  reducers: {},
});
const { actions, reducer } = productsSlide;
export const {
  //addItem,
} = actions;
export default reducer;
