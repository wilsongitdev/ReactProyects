import "./App.css";
import { Header } from "./components/Header";
import { Products } from "./components/Products";
// import { Footer } from "./components/Footer";
// import { IS_DEVELOPMENT } from "./config";
import { useFilters } from "./hooks/useFilters";
import { Cart } from "./components/Cart";
import { CartProvider } from "./context/Cart";
import { useLayoutEffect } from "react";
import { useProducts } from "./hooks/useProducts";
//import { products as initialProducts } from "./mocks/products.json";
//import { useCart } from "./hooks/useCart";

function App() {
  const { initialProducts, getProducts, errorMessage, isProductLoading } =
    useProducts();
  const { filterProducts, filters } = useFilters();
  const filteredProducts = filterProducts(initialProducts);

  useLayoutEffect(() => {
    getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CartProvider>
      <Header />
      <Products
        products={filteredProducts}
        errorMessage={errorMessage}
        isProductLoading={isProductLoading}
      />
      <Cart />
      {/* {IS_DEVELOPMENT && <Footer objFilter={filters} />} */}
    </CartProvider>
  );
}

export default App;
