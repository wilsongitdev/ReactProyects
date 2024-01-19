export const getAllProducts = async () => {
    try {
        const response = await fetch('https://dummyjson.com/products');
        const result = await response.json();
        return result.products;
    } catch (error) {
        throw new Error("Hubo un error en la API")
    }
}

export const fetchFilters = async () => {
    try {
        const response = await fetch('https://dummyjson.com/products/categories');
        const result = await response.json();
        return result;
    } catch (error) {
        throw new Error("No se han cargado los filtros")
    }
}

    
            