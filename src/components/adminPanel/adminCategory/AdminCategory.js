import styled from "styled-components";
import {useCallback, useEffect, useState} from "react";

const AdminCategoryWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`

const AdminCategoryContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
`

const AdminCategoryInput = styled.input`
    width: 100%;
    height: 40px;
    margin-right: 10px;
`

const AdminCategory = () => {
    const [categories, setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState(undefined)

    const [inputValue, setInputValue] = useState("")

    const fetchData = useCallback(async () => {
        const response = await fetch(`http://localhost:3001/categories`);
        const json = await response.json();
        setCategories(json)
    }, [])

    const handleChangeCategory = useCallback(async (obj) => {
        await fetch('http://localhost:3001/change-category', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ...obj
            }),
            credentials: "include"
        })
        await fetchData()
    }, [fetchData])

    useEffect(() => {
        fetchData()
    }, [fetchData]);

    return (
        <AdminCategoryWrapper>
            <h3>Редактирование категорий</h3>
            <AdminCategoryContainer style={{marginBottom: "20px"}}>
                <AdminCategoryInput
                    onChange={(e) => {
                        setInputValue(e.currentTarget.value)
                        if ((e.currentTarget.value.length <= 0) && selectedCategory) {
                            setSelectedCategory(undefined)
                        }
                    }}
                    value={inputValue}
                    placeholder={"Новая категория..."}/>
                <button style={{marginRight: "5px"}} disabled={!selectedCategory && (inputValue.length <= 0)} onClick={() => {
                    setInputValue("")
                    setSelectedCategory(undefined)
                }}>Очистить</button>
                <button onClick={async () => {
                    if (selectedCategory) {
                        await handleChangeCategory({category_id: selectedCategory.category_id, category_name: inputValue})
                    } else {
                        await handleChangeCategory({category_id: 0, category_name: inputValue})
                    }
                    setInputValue("")
                    setSelectedCategory(undefined)
                }}>{selectedCategory ? "Сохранить" : "Добавить"}</button>
            </AdminCategoryContainer>
            {categories.map((category) => <AdminCategoryContainer style={{marginBottom: "10px"}} key={category.category_id}>
                
                <div>
                    {category.category_name}
                </div>
                <div>
                    <button style={{marginRight: "5px"}}
                            onClick={() => {
                                setSelectedCategory(category)
                                setInputValue(category.category_name)
                            }}
                    >Редактировать</button>
                    <button onClick={async () => {
                        await handleChangeCategory({category_id: category.category_id, deleted: true})
                        if (selectedCategory.category_id === category.category_id) {
                            setSelectedCategory(undefined)
                        }
                    }}>Удалить</button>
                </div>
            </AdminCategoryContainer>)}
        </AdminCategoryWrapper>
    )
}

export default AdminCategory