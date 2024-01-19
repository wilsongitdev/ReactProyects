import { useCart } from "../hooks/useCart";
import { AddToCartIcon, RemoveFromCartIcon } from "./icons";
import "./Products.css";

export function Products({ products, errorMessage, isProductLoading }) {
  const { cart, addToCart, removeFromCart } = useCart();

  const checkProductInCart = (product) => {
    return cart.some((item) => item.id === product.id);
  };

  if (isProductLoading) {
    return <p>Cargando...........</p>;
  }

  return (
    <main className="products">
      {errorMessage && (
        <p style={{ color: "red", fontSize: "24px" }}>{errorMessage}</p>
      )}
      <ul>
        {products.slice(0, 30).map((product) => {
          const isProductInCart = checkProductInCart(product);
          return (
            <li key={product.id}>
              <img src={product.thumbnail} alt={product.title} />
              <div>
                <strong>
                  {product.title} - ${product.price}
                </strong>
              </div>
              <div>
                <button
                  style={{ backgroundColor: isProductInCart ? "red" : "#60f" }}
                  onClick={() =>
                    isProductInCart
                      ? removeFromCart(product)
                      : addToCart(product)
                  }
                >
                  {isProductInCart ? <RemoveFromCartIcon /> : <AddToCartIcon />}
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
