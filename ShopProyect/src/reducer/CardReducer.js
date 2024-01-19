export const CART_ACTION_TYPES = {
    ADD_TO_CART: "ADD_CART",
    REMOVE_FROM_CART: 'REMOVE_FROM_CART',
    CLEAR_CART: 'CLEAR_CART'
}
export const cartInitialState = JSON.parse(localStorage.getItem('cart')) || [];

const updateLocalStorage = (state) => {
    localStorage.setItem('cart', JSON.stringify(state));
}
export const CardReducer = (state, action) => {
 const { type, payload } = action;
  
  switch (type) {
    case CART_ACTION_TYPES.ADD_TO_CART: {
      // forma básica
      //setCart({ ...cart, product });
      // si se quiere añadir e incrementar la cantidad del producto se realiza lo siguiente
      // 1 checkear si el producto ya esta en el carrito
      const { id } = payload;
      const productInCardIndex = state.findIndex((item) => item.id == id);

      if (productInCardIndex >= 0) {
        // el producto está en el carrito
        // una forma  seria usando structured clone(hace copias profundas)
        // Forma 1
        // const newCart = structuredClone(state); // para arrays pequeños
        // newCart[productInCardIndex].quantity += 1;
        // Forma 2 más rápida
        const newCart = [
          ...state.slice(0, productInCardIndex),
          {...state[productInCardIndex],
            quantity: state[productInCardIndex].quantity + 1
          },
          ...state.slice(productInCardIndex + 1)
        ]

        updateLocalStorage(newCart)
        return newCart;
      }
      // producto no está en el carrito
      const newCart = [
        ...state,
        {
          ...payload,
          quantity: 1,
        },
      ];
      updateLocalStorage(newCart)
      return newCart;
    }

    case CART_ACTION_TYPES.REMOVE_FROM_CART: {
        const { id } = payload;

        const newState = state.filter((item) => item.id !== id);
        updateLocalStorage(newState)
        return newState;
    }

    case CART_ACTION_TYPES.CLEAR_CART: {
        updateLocalStorage([])
        return [];
    }
  }
  return state;
}