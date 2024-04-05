import React, {useState, useEffect} from 'react';
import {TableWrapper, Table, TD, TH, TR, Str, ButtonStr, Modal, ModalContent} from './TableReports.style';
import {FaSort, FaSortUp, FaSortDown} from 'react-icons/fa';
import {Link} from "react-router-dom";

const TableReports = () => {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [sortColumn, setSortColumn] = useState('data');
    const [sortDirection, setSortDirection] = useState('desc');
    const [editItemId, setEditItemId] = useState(null);
    const [editedValues, setEditedValues] = useState({});
    const [showModal, setShowModal] = useState(false);

    const fetchData = async () => {
        const response = await fetch(`http://localhost:3001/cattle-report?page=${page}&limit=10&column=${sortColumn}&direction=${sortDirection}`);
        const {results, total_pages} = await response.json();
        setData(results);
        setTotalPages(total_pages);
    };

    useEffect(() => {
        fetchData();
    }, [page, sortColumn, sortDirection]);

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    const handleSort = (column) => {
        if (sortColumn === column) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortDirection('asc');
        }
    };

    const getSortIcon = (column) => {
        if (sortColumn === column) {
            return sortDirection === 'asc' ? <FaSortUp/> : <FaSortDown/>;
        } else {
            return <FaSort/>;
        }
    };


    const handleUpdate = async (id, newData) => {
        await fetch(`http://localhost:3001/cattle-report/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newData),
        });
        // После обновления обновляем данные
        fetchData();
    };

    const handleEdit = (id) => {
        const itemToEdit = data.find(item => item.id === id);
        setEditItemId(id);
        setEditedValues(itemToEdit);
        setShowModal(true);
    };

    const handleSave = (id) => {
        handleUpdate(id, editedValues);
        setEditItemId(null);
        setEditedValues({});
        setShowModal(false);
    };

    const handleCancel = () => {
        setEditItemId(null);
        setEditedValues({});
        setShowModal(false);
    };

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setEditedValues((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    return (
        <TableWrapper>
            <h2 style={{display: 'flex', justifyContent: 'center', marginTop: '4%'}}>Таблица изменений</h2>
            <button style={{float: 'right', marginRight: '10%', color: 'white', background: '#0d6efd', borderRadius: '5px', border: 'none', fontSize: '25px', padding: '5px 10px 5px 10px', marginBottom: '2%', marginTop: '2%'}}><Link to={'/Forma'} style={{textDecoration: "none", color: "white"}}><b>+</b><p style={{fontSize: '10px'}}>(добавить запись)</p></Link></button>
            <Table>
                <thead>
                <TR>
                    <TH onClick={() => handleSort('data')}>
                        Дата {getSortIcon('data')}
                    </TH>

                    <TH onClick={() => handleSort('animal')}>
                        Животное {getSortIcon('animal')}
                    </TH>
                    <TH onClick={() => handleSort('quantity')}>
                        Количество {getSortIcon('quantity')}
                    </TH>
                    <TH onClick={() => handleSort('event')}>
                        Событие {getSortIcon('event')}
                    </TH>
                    <TH onClick={() => handleSort('weight')}>
                        Масса {getSortIcon('weight')}
                    </TH>
                    <TH onClick={() => handleSort('note')}>
                        Примечание {getSortIcon('note')}
                    </TH>
                    <TH>Действия</TH>
                </TR>
                </thead>
                <tbody>
                {data.map((item) => (
                    <TR key={item.id}>
                        <TD>{new Date(item.data).toLocaleDateString()}</TD>
                        <TD>{item.animal}</TD>
                        <TD>{item.quantity}</TD>
                        <TD>{item.event}</TD>
                        <TD>{item.weight}</TD>
                        <TD>{item.note}</TD>
                        <TD>
                            {editItemId === item.id ? (
                                <>
                                    <ButtonStr
                                        style={{marginRight: '5px'}}
                                        onClick={() => handleSave(item.id)}
                                    >
                                        Сохранить
                                    </ButtonStr>
                                    <ButtonStr onClick={handleCancel}>Отмена</ButtonStr>
                                </>
                            ) : (
                                <ButtonStr
                                    style={{
                                        marginRight: 'auto',
                                        marginLeft: 'auto',
                                        marginBottom: 'auto',
                                        padding: '5px 10px'
                                    }}
                                    onClick={() => handleEdit(item.id)}>Редактировать
                                </ButtonStr>
                            )}
                        </TD>
                    </TR>
                ))}
                </tbody>
            </Table>
            <button style={{float: 'right', marginTop:'2%', marginBottom: '2%', marginRight: '10%', color: 'white', background: '#0d6efd', borderRadius: '5px', border: 'none', fontSize: '20px', padding: '15px 15px 15px 15px'}}><Link to={'/Otchet'} style={{textDecoration: "none", color: "white"}}>Отчет по количеству</Link></button>
            <Str>
                <p style={{marginTop: '1%'}}>
                    Page {page} of {totalPages}
                </p>

                {page > 1 && (
                    <ButtonStr onClick={() => handlePageChange(page - 1)}>Назад</ButtonStr>
                )}
                {page < totalPages && (
                    <ButtonStr onClick={() => handlePageChange(page + 1)}>Далее</ButtonStr>
                )}
            </Str>

            {showModal && (
                <Modal>
                    <ModalContent>
                        <h3>Редактировать элемент</h3>
                        <form>
                            <input
                                type="date"
                                name="data"
                                value={editedValues.data || ''}
                                onChange={handleInputChange}
                            />

                            <input
                                type="text"
                                name="animal"
                                value={editedValues.animal || ''}
                                onChange={handleInputChange}
                            />
                            <input
                                type="text"
                                name="quantity"
                                value={editedValues.quantity || ''}
                                onChange={handleInputChange}
                            />
                            <input
                                type="text"
                                name="event"
                                value={editedValues.event || ''}
                                onChange={handleInputChange}
                            />
                            <input
                                type="text"
                                name="weight"
                                value={editedValues.weight || ''}
                                onChange={handleInputChange}
                            />
                            <input
                                type="text"
                                name="note"
                                value={editedValues.note || ''}
                                onChange={handleInputChange}
                            />
                        </form>
                        <div style={{marginTop: '1%'}}>
                            <ButtonStr onClick={() => handleSave(editItemId)}>Сохранить</ButtonStr>
                            <ButtonStr onClick={handleCancel}>Отмена</ButtonStr>
                        </div>
                    </ModalContent>
                </Modal>
            )}
        </TableWrapper>
    );
};

export default TableReports;
