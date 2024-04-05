import {createPortal} from "react-dom";
import React, {useEffect, useRef, useState} from "react";
import {Container1231, ContainerItem1231, FormButton1231, FormContainer1231, FormInput1231, StyledSpan1231} from "./Modal.style";
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {useDispatch} from "react-redux";
import {loginUser, setAuth} from "../../actions";
const modalRootElement = document.querySelector('#portal')
const Modal = (props) => {
    const dispatch = useDispatch()

    const {open, onClose, } = props;
    const ref = useRef();
    const [forms,setForms] = useState(true)
    const initialValues = {
        email: '',
        password: '',
        name: ''
    };
    const initialValuesForLogin = {
        email: '',
        password: '',
        name: ''
    };
    const validationSchema = Yup.object({
        email: Yup.string().email('Неверный формат email').required('Это поле обязательно для заполнения'),
        password: Yup.string().required('Это поле обязательно для заполнения').min(6, 'Пароль слишком короткий')
            .matches(/[a-zA-Z]/, 'Используйте только латинские буквы a-z'),
        name: Yup.string().required('Это поле обязательно для заполнения').min(4, 'Имя слишком короткое')
            .matches(/[a-zA-Z]/, 'Используйте только латинские буквы a-z')
    });
    const validationSchemaForLogin = Yup.object({
        email: Yup.string().email('Неверный формат email').required('Это поле обязательно для заполнения'),
        password: Yup.string().required('Это поле обязательно для заполнения').min(6, 'Пароль слишком короткий')
            .matches(/[a-zA-Z]/, 'Используйте только латинские буквы a-z')
    });
    const Registration = async (email, password, name) => {
        const response = await fetch('http://localhost:3001/registration', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                name: name,
                password: password
            })
        });

        if (response.ok) {
            console.log('nice')
        }
    };
    const Login = async (email, password, name) => {
        const response = await fetch('http://localhost:3001/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include",
            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        if (response.ok) {
            const user = await response.json();
            console.log(user)
            localStorage.setItem('token', user.accessToken)
            dispatch(loginUser(user.user))
            dispatch(setAuth(true))
            onClose();
        }
    };
    useEffect(() => {
        const checkOutside = (e) => {
            if (e.target?.contains(ref.current) && e.target !== ref.current) {
                onClose && onClose();
            }
        }
        document.addEventListener('click', checkOutside);
        document.addEventListener('scroll', checkOutside);
        return () => {
            document.removeEventListener('click', checkOutside)
            document.removeEventListener('scroll', checkOutside)
        }
    }, [onClose]);
    return createPortal(
        <>
            {open ? (
                <Container1231>
                    <ContainerItem1231 ref={ref}>
                        {forms ? (<FormContainer1231>Зарегистрируйтесь
                            <Formik initialValues={initialValues} validationSchema={validationSchema}
                                    onSubmit={values => console.log(JSON.stringify(values))}>
                                {({isSubmitting,isValid,dirty,values,resetForm}) => (
                                    <Form>
                                        <>
                                            <Field type='name' placeholder='Nickname' name='name' as={FormInput1231}/>
                                            <ErrorMessage name='name' component='div' className='ErrorMessages'/>
                                        </>
                                        <>
                                            <Field type='email' placeholder='E-mail' name='email' as={FormInput1231}/>
                                            <ErrorMessage name='email' component='div' className='ErrorMessages'/>
                                        </>
                                        <>
                                            <Field type='password' placeholder='Password' name='password' as={FormInput1231}/>
                                            <ErrorMessage name='password' component='div' className='ErrorMessages'/>
                                        </>
                                        <FormButton1231 disabled={!(isValid && dirty) || isSubmitting} onClick={async () => {
                                            isSubmitting = true
                                            await Registration(values.email, values.password,values.name)
                                            setTimeout(() => resetForm(), 500)
                                        }}>
                                            {isSubmitting ? 'Загрузка...' : 'Зарегистрироваться'}
                                        </FormButton1231>
                                    </Form>
                                )}
                            </Formik>
                            <span>Уже зарегистрированы? <span onClick={()=>setForms(false)}>Войти</span></span>
                        </FormContainer1231>) : (<FormContainer1231>Войдите в аккаунт
                            <Formik initialValues={initialValuesForLogin} validationSchema={validationSchemaForLogin}
                                    onSubmit={values => console.log(JSON.stringify(values))}>
                                {({isSubmitting,isValid,dirty,values,resetForm}) => (
                                    <Form>
                                        <>
                                            <Field type='email' placeholder='E-mail' name='email' as={FormInput1231}/>
                                            <ErrorMessage name='email' component='div' className='ErrorMessages'/>
                                        </>
                                        <>
                                            <Field type='password' placeholder='Password' name='password' as={FormInput1231}/>
                                            <ErrorMessage name='password' component='div' className='ErrorMessages'/>
                                        </>
                                        <StyledSpan1231>Забыли пароль?</StyledSpan1231>
                                        <FormButton1231 disabled={!(isValid && dirty) || isSubmitting} onClick={async () => {
                                            isSubmitting = true
                                            await Login(values.email, values.password)
                                            setTimeout(() => resetForm(), 500)
                                        }}>
                                            {isSubmitting ? 'Загрузка...' : 'Войти'}
                                        </FormButton1231>
                                    </Form>
                                )}
                            </Formik>
                            <span>Еще нет аккаунта? <span onClick={()=>setForms(true)}>Зарегистрируйтесь</span></span>
                        </FormContainer1231>)}
                    </ContainerItem1231>
                </Container1231>) : null}
        </>
        , modalRootElement);
}

export default Modal;
