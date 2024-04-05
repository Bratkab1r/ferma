import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TableWrapper, Table, TD, TH, TR, Str, ButtonStr } from './TableReports.style';
import { FaSort, FaSortDown, FaSortUp } from 'react-icons/fa';

const OotchetTable = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortColumn, setSortColumn] = useState('quantity');
    const [sortDirection, setSortDirection] = useState('desc');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/cattle-otchetnic', {
                    params: {
                        page: page,
                        limit: 20,
                        column: sortColumn,
                        direction: sortDirection,
                    },
                });
                setData(response.data.results);
                setLoading(false);
                setTotalPages(response.data.total_pages);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchData();
    }, [page, sortColumn, sortDirection]);

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    const handleSort = (column) => {
        if (sortColumn === column) {
            // If the same column was clicked again, toggle the sort direction
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            // Otherwise, sort by the new column in ascending order
            setSortColumn(column);
            setSortDirection('asc');
        }
    };

    const getSortIcon = (column) => {
        if (sortColumn === column) {
            return sortDirection === 'asc' ? <FaSortUp /> : <FaSortDown />;
        } else {
            return <FaSort />;
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <TableWrapper>
            <h2 style={{ display: 'flex', justifyContent: 'center', marginTop: '4%' }}>Отчетная таблица</h2>
            <Table>
                <thead>
                <TR>
                    <TH onClick={() => handleSort('animal')}>
                        Животное{getSortIcon('animal')}
                    </TH>
                    <TH onClick={() => handleSort('quantity')}>
                        Количество{getSortIcon('quantity')}
                    </TH>
                </TR>
                </thead>
                <tbody>
                {data.map((item) => (
                    <tr key={item.id}>
                        <TD>{item.animal}</TD>
                        <TD>{item.quantity}</TD>
                    </tr>
                ))}
                </tbody>
            </Table>
            <Str>
                <p>
                    Page {page} of {totalPages}
                </p>
                {page > 1 && (
                    <ButtonStr onClick={() => handlePageChange(page - 1)}>Назад</ButtonStr>
                )}
                {page < totalPages && (
                    <ButtonStr onClick={() => handlePageChange(page + 1)}>Далее</ButtonStr>
                )}
            </Str>
        </TableWrapper>
    );
};

export default OotchetTable;