import { createSlice } from "@reduxjs/toolkit";
const tabSlide = createSlice({
  name: "tab",
  initialState: {currentTabId : 1, isClosed : false},
  reducers: {
    activeTab: (state, action) => {
      state.currentTabId = action.payload
      state.isClosed = false
    },
    closeTab: (state, action) => {
      if(state.currentTabId > 1 && state.currentTabId === action.payload) state.isClosed = true
    },
  },
});
const { actions, reducer } = tabSlide;
export const { activeTab, closeTab } = actions;
export default reducer;
