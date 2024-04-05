import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Button, Modal, Form, Table} from 'react-bootstrap';
import {TableWrapper, TD, TH, TR} from "../tableReports/TableReports.style";


const AnimalList = () => {
    const [newAnimalList, setNewAnimalList] = useState([]);
    const [animals, setAnimals] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newAnimal, setNewAnimal] = useState('');

    const fetchAnimals = async () => {
        try {
            const response = await axios.get('http://localhost:3001/cattle-animal-list');
            setAnimals(response.data);
            setNewAnimalList(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const addAnimal = async () => {
        try {
            await axios.post('http://localhost:3001/cattle-animal-list', { animal: newAnimal });
            setNewAnimal('');
            setShowModal(false);
            fetchAnimals(); // Получение обновленного списка животных
        } catch (error) {
            console.log(error);
        }
    };

    const deleteAnimal = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/cattle-animal-list/${id}`);
            fetchAnimals(); // Получение данных после удаления животного
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchAnimals(); // Получение данных при загрузке компонента
    }, []);

    return (
        <TableWrapper>
            <h1 style={{display: 'flex', justifyContent: 'center', marginTop: '2%', marginBottom: '2%'}}>Список животных фермы</h1>
            <Button style={{marginRight: '45%', marginLeft: '45%', marginBottom: '2%'}} variant="primary" onClick={() => setShowModal(true)}><b>Добавить животное +</b></Button>

            <Table>
                <thead>
                <TR>
                    <TH>Животное</TH>
                </TR>
                </thead>
                <tbody>
                {newAnimalList.map((animal) => (
                    <TR key={animal.id}>
                        <TD style={{width: "85%"}}>{animal.animal}</TD>
                        <TD>
                            <Button variant="danger" onClick={() => deleteAnimal(animal.id)}>Удалить</Button>
                        </TD>
                    </TR>
                ))}
                </tbody>
            </Table>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Добавить животное</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="animal">
                            <Form.Label>Животное</Form.Label>
                            <Form.Control
                                type="text"
                                value={newAnimal}
                                onChange={(e) => setNewAnimal(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Отмена</Button>
                    <Button variant="primary" onClick={addAnimal}>Добавить</Button>
                </Modal.Footer>
            </Modal>
        </TableWrapper>
    );
};

export default AnimalList;
