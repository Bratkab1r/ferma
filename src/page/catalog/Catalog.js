import {useCallback, useEffect, useState} from "react";
import "./catalog.css"
import CatalogFilters from "../../components/catalog/catalogFilters/CatalogFilters";
import CatalogCard from "../../components/catalog/catalogCard/CatalogCard";


const Catalog = () => {
    const [products, setProducts] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])
    const [addedProducts, setAddedProducts] = useState([])

    const [selectedCategory, setSelectedCategory] = useState(null)
    const [selectedFilter, setSelectedFilter] = useState(null)

    const fetchData = useCallback(async () => {
        const response = await fetch(`http://localhost:3001/products`);
        const json = await response.json();
        setProducts(json)
    }, [])

    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem('farm-cart'))
        const addedPrTmp = []
        if (cart instanceof Array) {
            cart.forEach((pr) => {
                if (!addedPrTmp.includes(pr.id)) {
                    addedPrTmp.push(pr.id)
                }
            })
        }
        setAddedProducts(addedPrTmp)
    }, [])

    useEffect(() => {
        fetchData()
    }, [fetchData]);

    useEffect(() => {
        let copyArray = [...products]
        if (selectedCategory) {
            copyArray = copyArray.filter((v) => v.category_name === selectedCategory)
        }
        if (selectedFilter) {
            switch (selectedFilter) {
                case "Цена":
                    copyArray.sort((a, b) => {
                        return a.price - b.price
                    })
                    break;
                case "Наименование":
                    copyArray.sort((a, b) => {
                        if (a.title.toLowerCase() < b.title.toLowerCase()) {
                            return -1;
                        }
                        if (a.title.toLowerCase() > b.title.toLowerCase()) {
                            return 1;
                        }
                        return 0;
                    })
                    break;
                case "В наличии":
                    copyArray = copyArray.filter((v) => v.quantity > 0)
            }
        }
        setFilteredProducts(copyArray)
    }, [products, selectedFilter, selectedCategory, addedProducts]);

    return (
        <div className={"body-container catalog-wrapper"}>
            <div className={"filters-block"}>
                <CatalogFilters selectedFilter={selectedFilter} selectedCategory={selectedCategory}
                                onCategory={setSelectedCategory} onFilter={setSelectedFilter}/>
            </div>
            <div className={"catalog-block"}>
                {filteredProducts.map((product, i) => <CatalogCard product={product} key={i}
                                                                   onAdd={setAddedProducts}
                                                                   isAdded={addedProducts.filter((v) => v === product.id).length > 0}/>
                )}
            </div>
        </div>
    )
}

export default Catalog