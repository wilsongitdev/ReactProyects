import { useContext } from "react";
import { CartContext } from "../context/Cart";

export function useCart(){
    const cartContext = useContext(CartContext);

    if (cartContext === undefined){
        throw new Error('useCart debe estar dentro de un CardProvider');
    }
    
    return cartContext
}