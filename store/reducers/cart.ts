import { AnyAction } from "redux";
import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/cart";
import { ADD_ORDER } from "../actions/orders";
import CartItem from "../../models/cart-item";
// import { DELETE_PRODUCT } from "../actions/products";

const initialState = {
  items: {},
  totalAmount: 0,
};

export default (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedProduct = action.product;
      const cost = addedProduct.cost;
      const name = addedProduct.name;
      const description = addedProduct.description;

      let updatedOrNewCartItem;

      if (state.items[addedProduct.name]) {
        // already have the item in the cart
        updatedOrNewCartItem = new CartItem(
          state.items[addedProduct.name].quantity + 1,
          cost,
          name,
          description,
          state.items[addedProduct.name].sum + cost
        );
      } else {
        updatedOrNewCartItem = new CartItem(1, cost, name, description, cost);
      }
      return {
        ...state,
        items: { ...state.items, [addedProduct.name]: updatedOrNewCartItem },
        totalAmount: state.totalAmount + cost,
      };
    case REMOVE_FROM_CART:
      const selectedCartItem = state.items[action.name];
      const currentQty = selectedCartItem.quantity;
      let updatedCartItems;
      if (currentQty > 1) {
        // need to reduce it, not erase it
        const updatedCartItem = new CartItem(
          selectedCartItem.quantity - 1,
          selectedCartItem.cost,
          selectedCartItem.name,
          selectedCartItem.description,
          selectedCartItem.sum - selectedCartItem.cost
        );
        updatedCartItems = { ...state.items, [action.name]: updatedCartItem };
      } else {
        updatedCartItems = { ...state.items };
        delete updatedCartItems[action.name];
      }
      return {
        ...state,
        items: updatedCartItems,
        totalAmount: state.totalAmount - selectedCartItem.cost,
      };
    case ADD_ORDER:
      return initialState;
    // case DELETE_PRODUCT:
    //   if (!state.items[action.name]) {
    //     return state;
    //   }
    //   const updatedItems = { ...state.items };
    //   const itemTotal = state.items[action.name].sum;
    //   delete updatedItems[action.name];
    //   return {
    //     ...state,
    //     items: updatedItems,
    //     totalAmount: state.totalAmount - itemTotal,
    //   };
  }

  return state;
};
