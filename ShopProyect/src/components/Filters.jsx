import { useEffect, useId } from "react";
import "./Filters.css";
import { useFilters } from "../hooks/useFilters";
import { useSearchFilter } from "../hooks/useSearchFilter";

export function Filters() {
  const { filters, setFilters } = useFilters();
  const { AllFilters, getAllFilters, errorFilterList } = useSearchFilter();
  const minPriceFilterId = useId();
  const categoryFilterId = useId();

  const handleChangeCategory = (e) => {
    setFilters((prevState) => ({
      ...prevState,
      category: e.target.value,
    }));
  };

  const handleChangePrice = (e) => {
    setFilters((prevState) => ({
      ...prevState,
      minPrice: e.target.value,
    }));
  };

  useEffect(() => {
    getAllFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (errorFilterList) {
    return <p style={{ color: "red", fontSize: "24px" }}>{errorFilterList}</p>;
  }
  return (
    <>
      <h1>Mi Shop</h1>
      <div className="filter">
        <div>
          <label htmlFor={minPriceFilterId}>Precio mínimo</label>
          <input
            type="range"
            id={minPriceFilterId}
            onChange={handleChangePrice}
            min="0"
            max="1500"
            value={filters.minPrice}
          />
          <span>${filters.minPrice}</span>
        </div>
        <div>
          <label htmlFor={categoryFilterId}>Categoría: </label>
          <select onChange={handleChangeCategory} id={categoryFilterId}>
            <option value="all" id="category">
              Todos
            </option>
            {AllFilters.map((filter, id) => (
              <option key={id} value={filter} id={filter}>
                {filter}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
}
