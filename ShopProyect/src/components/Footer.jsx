import { useCart } from "../hooks/useCart";
import { useFilters } from "../hooks/useFilters";
import "./Footer.css";

export function Footer() {
  const { filters } = useFilters();
  const { cart } = useCart();
  return (
    <div className="footer">
      {/* {JSON.stringify(filters)} */}
      {JSON.stringify(cart)}
    </div>
  );
}
