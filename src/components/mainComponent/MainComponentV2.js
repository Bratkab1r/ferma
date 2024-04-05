import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import styled from "styled-components";
import {useEffect, useState} from "react";
import axios from "axios";


const ContItem = styled.div`
  width: 10vw;
  height: 2.5vw;
  margin-right: 1%;

  .ErrorMessages {
    color: red;
    font-size: 12px;
  }
`

const InputStyle = styled.input`
  width: 7vw;
  height: 1.5vw;
`
const Submit = styled.button`
  padding: 10px 20px;
  justify-content: center;
  background-color: saddlebrown;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;
  margin-top: 1%;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 1%;
`

const Stroke = styled.div`
  display: inline-flex;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
  justify-content: normal;
  flex-wrap: inherit;
`

const FormReport = () => {
    const currentDate = new Date().toISOString().slice(0, 16);
    const [selectedAnimal, setSelectedAnimal] = useState('selectedAnimal');
    const initialValues = {
        data: currentDate,
        event: '',
        animal: selectedAnimal,
        quantity: '',
        weight: '',
        note: '',
    };

    const [animalList, setAnimalList] = useState([]);

    const fetchAnimalList = async () => {
        try {
            const response = await axios.get('http://localhost:3001/cattle-animal-list');
            setAnimalList(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchAnimalList();
    }, []);

    const validationSchema = Yup.object({
        event: Yup.string().required('Это поле обязательно для заполнения'),
        animal: Yup.string().required('Это поле обязательно для заполнения'),
        quantity: Yup.number().required('Это поле обязательно для заполнения'),
        weight: Yup.number().required('Это поле обязательно для заполнения'),
        note: Yup.string().max(200, 'Максимальное количество символов: 200'),
    })
    const handleSubmit = async (values) => {
        try {
            const formData = {
                ...values,
                animal: selectedAnimal,
            };
            const response = await fetch("http://localhost:3001/cattle-report", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            console.log('Response:', data);
        } catch (error) {
            console.error('Error handling response:', error);
        }
    }

    const handleChange = (event) => {
        setSelectedAnimal(event.target.value);
    }


    return (
        <Formik style={{width: '200px', marginRight: 'auto', marginLeft: 'auto'}} initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={values => console.log(JSON.stringify(values))}>
            {({isSubmitting, isValid, dirty, values, resetForm}) => (
                <Form style={{marginRight: 'auto', marginLeft: 'auto', display: 'flex'}}>
                    <Stroke>
                        <ContItem>
                            <Field type='event' name='event' placeholder='Событие' as={InputStyle}/>

                            <ErrorMessage name='event' component='div' className='ErrorMessages'/>
                        </ContItem>
                        <ContItem>
                            <Field
                                style={{width: '7vw' ,height: '1.5vw'}}
                                as={InputStyle}
                                name="animal"
                                placeholder="Введите животное"
                                component="select"
                                value={selectedAnimal}
                                onChange={handleChange}
                            >
                                <option style={{width: '7vw' ,height: '1.5vw'}} value="">Выберите животное</option>
                                {animalList.map((animal) => (
                                    <option style={{width: '7vw' ,height: '1.5vw'}} key={animal.id} value={animal.animal}>
                                        {animal.animal}
                                    </option>
                                ))}
                            </Field>
                            <ErrorMessage name='animal' component='div' className='ErrorMessages'/>
                        </ContItem>
                        <ContItem>
                            <Field type='number' name='quantity' placeholder='Количество' as={InputStyle}/>
                            <ErrorMessage name='quantity' component='div' className='ErrorMessages'/>
                        </ContItem>
                        <ContItem>
                            <Field type='number' name='weight' placeholder='Масса' as={InputStyle}/>
                            <ErrorMessage name='weight' component='div' className='ErrorMessages'/>
                        </ContItem>
                        <ContItem>
                            <Field type='textarea' name='note' placeholder='Примечание' as={InputStyle}/>
                            <ErrorMessage name='note' component='div' className='ErrorMessages'/>
                        </ContItem>
                    </Stroke>
                    <Submit type='submit' disabled={!(isValid && dirty) || isSubmitting} onClick={async () => {
                        isSubmitting = true
                        await handleSubmit(values)
                        setTimeout(() => resetForm(), 500)
                    }}>
                        {isSubmitting ? 'Загрузка...' : 'Отправить'}
                    </Submit>
                </Form>
                )}
        </Formik>
    )
}

export default FormReport;