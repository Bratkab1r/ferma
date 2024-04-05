import styled from "styled-components";
import AdminMenu from "../../components/adminPanel/adminMenu/AdminMenu";
import {useState} from "react";
import AllOrders from "../../components/adminPanel/allOrders/AllOrders";
import AdminCatalog from "../../components/adminPanel/adminCatalog/AdminCatalog";
import AdminProduct from "../../components/adminPanel/adminProduct/AdminProduct";
import AdminCategory from "../../components/adminPanel/adminCategory/AdminCategory";

const AdminPanelWrapper = styled.div`
    width: 100%;
    display: flex;
`

const AdminPanelMenu = styled.div`
    width: 30%;
`

const AdminPanelContent = styled.div`
    flex: 1;
    padding: 0 0.5rem;
`

const AdminPanel = () => {
    const [selectedBlock, setSelectedBlock] = useState(undefined)
    const [selectedProduct, setSelectedProduct] = useState(undefined)
    return (
        <div className={"body-container"}>
            <h3>Панель администратора</h3>
            <AdminPanelWrapper>
                <AdminPanelMenu>
                    <AdminMenu selectedBlock={selectedBlock} onSelect={setSelectedBlock}/>
                </AdminPanelMenu>
                <AdminPanelContent>
                    {selectedBlock === "Заказы" && <AllOrders/>}
                    {selectedBlock === "Каталог" && <AdminCatalog onSelect={(product) => {
                        setSelectedBlock("Товар")
                        setSelectedProduct(product)
                    }}/>}
                    {selectedBlock === "Товар" && <AdminProduct selectedProduct={selectedProduct} onCancel={() => {
                        setSelectedBlock("Каталог")
                        setSelectedProduct(undefined)
                    }}/>}
                    {selectedBlock === "Категории" && <AdminCategory/>}
                </AdminPanelContent>
            </AdminPanelWrapper>
        </div>
    )
}

export default AdminPanel