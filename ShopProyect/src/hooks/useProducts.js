import { useState } from "react";
import { getAllProducts } from "../service/service";

export function useProducts () {

    const [products, setProducts] = useState([]);
    const [ errorMessage, setErrorMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const getProducts = async () => {
        try {
            setIsLoading(true);
            const responseProducts = await getAllProducts();
            setIsLoading(false);
            setProducts(responseProducts);
        } catch (error) {
            setErrorMessage(error.message);
        }
    };
    
    return {initialProducts: products, getProducts, errorMessage, isProductLoading: isLoading}

}