import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../Components/Cart/cartSlice";
import tabReducer from "../Components/Cart/tabSlice";
const store = configureStore({
  reducer: {
    tab: tabReducer,
    cart: cartReducer,
  },
  preloadedState: loadFromLocalStorage(),
});
function saveToLocalStorage(state) {
  try {
    const serialState = JSON.stringify(state);
    localStorage.setItem(
      "reduxStore",serialState);
  } catch (e) {
    console.warn(e);
  }
}

function loadFromLocalStorage() {
  try {
    let serialisedState = localStorage.getItem("reduxStore");
    if (serialisedState === null) return undefined;
    //const listState = JSON.parse(serialisedState);
    return JSON.parse(serialisedState);
  } catch (e) {
    console.warn(e);
    return undefined;
  }
}
store.subscribe(() => saveToLocalStorage(store.getState()));
export default store;
