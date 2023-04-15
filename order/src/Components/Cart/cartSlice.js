import { createSlice } from "@reduxjs/toolkit";
const tasksSlide = createSlice({
  name: "cart",
  initialState: [
    {
      tabId: 1,
      cartItems: [],
      total: 0,
      totalAmount: 0,
      notes: "",
    },
  ],
  reducers: {
    addCart: (state, action) => {
      let newCart = {
        tabId: action.payload,
        cartItems: [],
        total: 0,
        totalAmount: 0,
        notes: "",
      };
      state.push(newCart);
    },
    removeCart: (state, action) => {
      return state.filter(element => element.tabId !== action.payload);
    },
    addItem: (state, action) => {
      let cartIndex = state.findIndex(
        (data) => data.tabId === action.payload.tabId
      );

      if (cartIndex === -1) {
        let newCart = {
          tabId: action.payload.tabId,
          cartItems: [],
          total: 0,
          totalAmount: 0,
          notes: "",
        };
        state.push(newCart);
        cartIndex = 0;
      }
      const newItem = action.payload.product;     
      let index = state[cartIndex].cartItems.findIndex(
        (data) => data.id === newItem.id
      );
      if (index !== -1) {
        state[cartIndex].cartItems[index].quantity++;
      } else {
        state[cartIndex].cartItems.push(newItem);
      }
      state[cartIndex].total = state.total + 1;
      state[cartIndex].totalAmount =
        state.totalAmount + newItem.qty * newItem.price;
    },

    removeItem: (state, action) => {
      const selectedItem = action.payload.product;
      let cartIndex = state.findIndex(
        (data) => data.tabId === action.payload.tabId
      );
      state[cartIndex].cartItems.splice(selectedItem, 1);
      state[cartIndex].total = state.total - 1;
      state[cartIndex].totalAmount =
        state.totalAmount - selectedItem.qty * selectedItem.price;
    },

    changeNotes: (state, action) => {
      let cartIndex = state.findIndex(
        (data) => data.tabId === action.payload.tabId
      );
      state[cartIndex].notes = action.payload.notes;
    },

    decreaseQty: (state, action) => {
      let cartIndex = state.findIndex(
        (data) => data.tabId === action.payload.tabId
      );
      let index = state[cartIndex].cartItems.findIndex(
        (data) => data.id === action.payload.id
      );
      if (state[cartIndex].cartItems[index].quantity > 1)
        state[cartIndex].cartItems[index].quantity--;
    },

    increaseQty: (state, action) => {
      let cartIndex = state.findIndex(
        (data) => data.tabId === action.payload.tabId
      );
      state[cartIndex].cartItems.find((x) => x.id === action.payload.id)
        .quantity++;
    },

    addItemNotes: (state, action) => {
      let cartIndex = state.findIndex(
        (data) => data.tabId === action.payload.tabId
      );
      state[cartIndex].cartItems.find((x) => x.id === action.payload.id).note =
        action.payload.note;
    },

    changeItemPrice: (state, action) => {
      let cartIndex = state.findIndex(
        (data) => data.tabId === action.payload.tabId
      );
      state[cartIndex].cartItems.find(
        (x) => x.id === action.payload.rowId
      ).display_price = action.payload.display_price;
      state[cartIndex].cartItems.find(
        (x) => x.id === action.payload.rowId
      ).discount_percent = action.payload.discount_percent;
      state[cartIndex].cartItems.find(
        (x) => x.id === action.payload.rowId
      ).discount_amount = action.payload.discount_amount;
    },

    clearCart: (state, action) => {
      let cartIndex = state.findIndex(
        (data) => data.tabId === action.payload
      );
      state[cartIndex].cartItems = [];
    },
  },
});
const { actions, reducer } = tasksSlide;
export const {
  addItem,
  removeItem,
  changeNotes,
  decreaseQty,
  increaseQty,
  addItemNotes,
  clearCart,
  changeItemPrice,
  addCart,
  removeCart,
} = actions;
export default reducer;
