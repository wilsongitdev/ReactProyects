import { useState } from "react"
import { fetchFilters } from "../service/service";

export function useSearchFilter(){

    const [AllFilters, setAllFilters] = useState([])
    const [errorFilterList, setErrorFilterList] = useState(null)
    const getAllFilters = async () => {
        try {
          const allFilters =  await fetchFilters();
          setAllFilters(allFilters);
        } catch (error) {
          setErrorFilterList(error.message)
        }
    }

    return {getAllFilters, AllFilters, errorFilterList}
}