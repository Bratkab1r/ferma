import styled from "styled-components";

const AdminMenuWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`

const AdminMenuEntity = styled.div`
    width: 100%;
    padding: 1rem;
    background-color: ${props => props.isSelected && "rgba(0,0,0,.05)"};
    cursor: pointer;
    
    &:hover {
        background-color: rgba(0,0,0,.05);
    }
`

const AdminMenu = ({selectedBlock, onSelect}) => {
    return (
        <AdminMenuWrapper>
            <AdminMenuEntity isSelected={selectedBlock === "Заказы"} onClick={() => onSelect("Заказы")}>
                ЗАКАЗЫ
            </AdminMenuEntity>
            <AdminMenuEntity isSelected={selectedBlock === "Каталог"} onClick={() => onSelect("Каталог")}>
                КАТАЛОГ
            </AdminMenuEntity>
            <AdminMenuEntity isSelected={selectedBlock === "Категории"} onClick={() => onSelect("Категории")}>
                КАТЕГОРИИ
            </AdminMenuEntity>
        </AdminMenuWrapper>
    )
}

export default AdminMenu