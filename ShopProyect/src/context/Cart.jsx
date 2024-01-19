import { createContext, useReducer } from "react";
import { cartInitialState, CardReducer } from "../reducer/CardReducer";

// crear contexto
export const CartContext = createContext();

const useCardReducer = () => {
  const [state, dispatch] = useReducer(CardReducer, cartInitialState);
  const addToCart = (product) => {
    dispatch({
      type: "ADD_CART",
      payload: product,
    });
  };

  const removeFromCart = (product) => {
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: product,
    });
  };

  const clearCart = () => {
    dispatch({
      type: "CLEAR_CART",
    });
  };

  return { state, addToCart, removeFromCart, clearCart };
};
// crear provider
export function CartProvider({ children }) {
  const {
    state: cart,
    addToCart,
    removeFromCart,
    clearCart,
  } = useCardReducer();

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        clearCart,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
