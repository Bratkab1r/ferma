import "./catalogFilters.css"
import {useCallback, useEffect, useState} from "react";

const CatalogFilters = ({onCategory, onFilter, selectedFilter, selectedCategory}) => {
    const [categories, setCategories] = useState([])

    const fetchData = useCallback(async () => {
        const response = await fetch(`http://localhost:3001/categories`);
        const json = await response.json();
        setCategories(json)
    }, [])

    useEffect(() => {
        fetchData()
    }, [fetchData]);

    return (
        <div className={'catalog-filters-wrapper'}>
            <h4>Фильтры</h4>
            <FilterEntity title={"Цена"} onTap={onFilter} isSelected={selectedFilter === "Цена"}/>
            <FilterEntity title={"Наименование"} onTap={onFilter} isSelected={selectedFilter === "Наименование"}/>
            <FilterEntity title={"В наличии"} onTap={onFilter} isSelected={selectedFilter === "В наличии"}/>
            <h4>Категории</h4>
            {categories.map((cat, i) => <FilterEntity key={i} title={cat.category_name} isSelected={selectedCategory === cat.category_name} onTap={onCategory}/>)}
        </div>
    )
}

export default CatalogFilters

const FilterEntity = ({title, isSelected, onTap}) => {
    return (
        <button onClick={() => {
            if (isSelected) {
                onTap(null)
            } else {
                onTap(title)
            }
        }} className={`filter-entity ${isSelected && "filter-selected"}`}>
            {title}
        </button>
    )
}