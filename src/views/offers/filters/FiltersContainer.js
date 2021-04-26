import React from 'react'
import Filters from "./Filters";
import {CATEGORIES_QUERY} from "../../categories/list/List";
import {useQuery} from "@apollo/react-hooks";
import {MATERIALS_QUERY} from "../../materials/list/List";

const FiltersContainer = ({params, handleFiltersChange}) => {
  const {loading: loadingCategories, error: categoriesError, data: categoriesData} = useQuery(CATEGORIES_QUERY);
  const {loading: loadingMaterials, error: materialsError, data: materialsData} = useQuery(MATERIALS_QUERY);

  if (categoriesError || materialsError)
    return <p>Oops, algo salio mal!</p>

  if (loadingCategories || loadingMaterials)
    return <p>Cargando...</p>

  return (
    <Filters
      params={params}
      handleFiltersChange={handleFiltersChange}
      categories={categoriesData.categories}
      materials={materialsData.materials}
    />
  );
}

export default FiltersContainer;
