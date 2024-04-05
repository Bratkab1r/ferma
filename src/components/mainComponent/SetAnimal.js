import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import styled from "styled-components";
import {useState} from "react";


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
    const [groups, setGroups] = useState([]);
    const currentDate = new Date().toISOString().slice(0, 16);
    const [selectedAnimal, setSelectedAnimal] = useState('selectedAnimal');
    const initialValues = {
        number: '',
        data: currentDate,
        event: '',
        animal: selectedAnimal,
        quantity: '',
        weight: '',
        note: '',
    };

    const handleAddGroup = () => {
        setGroups([...groups, { number: "", data: currentDate, event: "", animal: selectedAnimal, quantity: "", weight: "", note: "" }]);
    };

    const handleGroupChange = (index, field, value) => {
        const updatedGroups = [...groups];
        updatedGroups[index][field] = value;
        setGroups(updatedGroups);
    };

    const validationSchema = Yup.object({
        number: Yup.number().required('Это поле обязательно для заполнения'),
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

            const someGroup = {
                groups: groups,
            };
            const response = await fetch("http://localhost:3001/cattle-report", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData, someGroup),
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
                    <Stroke>{groups.map((group, index) => (
                        <div key={index} >
                        <ContItem>
                            <Field type='number' name='number' placeholder='Код_животного' as={InputStyle}/>
                            <ErrorMessage name='number' component='div' className='ErrorMessages'/>
                        </ContItem>
                        <ContItem>
                            <Field type='event' name='event' placeholder='Событие' as={InputStyle}/>

                            <ErrorMessage name='event' component='div' className='ErrorMessages'/>
                        </ContItem>
                        <ContItem>
                            <Field
                                as={InputStyle}
                                name="animal"
                                placeholder="Введите животное"
                                value={selectedAnimal}
                                onChange={handleChange} // Добавляем обработчик handleChange к полю animal
                            >
                                {({field}) => (
                                    <div style={{width: '7vw', height: '1.5vw'}}>
                                        <select style={{width: '7vw', height: '1.5vw'}} {...field}
                                                value={selectedAnimal}
                                                onChange={handleChange}>
                                            <option value=''>Выберите животное</option>
                                            <option value='Бройлер'>Бройлер</option>
                                            <option value='Бройлер ципленок'>Бройлер ципленок</option>
                                            <option value='Перепелка'>Перепелка</option>
                                            <option value='Перепелка ципленок'>Перепелка ципленок</option>
                                            <option value='Гусь'>Гусь</option>
                                            <option value='Гусь цыпленок'>Гусь цыпленок</option>
                                            <option value='Утка'>Утка</option>
                                            <option value='Утка цыпленок'>Утка цыпленок</option>
                                            <option value='Индюк'>Индюк</option>
                                            <option value='Индюк цыпленок'>Индюк цыпленок</option>
                                            <option value='Курица'>Курица</option>
                                            <option value='Курица цыпленок'>Курица цыпленок</option>
                                            <option value='Овца'>Овца</option>
                                            <option value='Баран'>Баран</option>
                                            <option value='Ягненок'>Ягненок</option>
                                            <option value='Козел'>Козел</option>
                                            <option value='Коза'>Коза</option>
                                            <option value='Козленок'>Козленок</option>
                                            <option value='Корова'>Корова</option>
                                            <option value='Бык'>Бык</option>
                                            <option value='Теленок'>Теленок</option>
                                            <option value='Яйцо закладка'>Яйцо закладка</option>
                                            <option value='Яйцо вылупление'>Яйцо вылупление</option>
                                        </select>
                                    </div>
                                )}
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
                        </div>))}
                    </Stroke>
                    <button type="button" onClick={handleAddGroup}>
                        +
                    </button>
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