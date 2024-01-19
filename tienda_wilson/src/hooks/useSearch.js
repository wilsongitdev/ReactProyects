import { useState, useEffect, useRef } from "react";

export function useSearch(){
    const [search, updateSearch] = useState("");
    const [error, setError] = useState(null);
    const isFirstInput = useRef(true);

    useEffect(() => {
      if (isFirstInput.current && search === "") {
        isFirstInput.current = search === "";
        return
      }
      
      if (search === "") {
        setError("No se puede buscar una película vacía");
        return
      }
      if (search.length < 3) {
        setError("La búsqueda debe tener al menos 3 caracteres");
        return
      }
      if (search.match(/^\d+/)) {
        setError("No se puede buscar película con número");
        return
      }
      setError(null);
    }, [search, updateSearch]);
    return { search, updateSearch, error };
}
