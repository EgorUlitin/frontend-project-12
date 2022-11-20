import axios from 'axios';
import cn from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import { Formik, Field } from 'formik';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from '../contexts/AuthProvider';
import routes from '../routes/routes.js';
import * as yup from 'yup';

import image from '../signup_img.jpg';

// let schema = yup.object().shape({
//   username: yup.string().required(),
//   password: yup.string().min(6).required(),
//   confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Пароли должны совподать').required(),
// });

const SingupPage = () => {
  const inputRef = useRef();
  const auth = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <Container className='h-100' fluid>
      <Row className="justify-content-center align-content-center h-100">
        <Col className='col-12 col-md-8 col-xxl-6'>
          <Card className="shadow-sm">
            <Card.Body className='row p-5'>
              <div className='col-12 col-md-6 d-flex align-items-center justify-content-center'>
                <Card.Img className='rounded-circle' variant="center" src={image} />
              </div>
              <Formik
                validateOnBlur
                initialValues={{ username: '', password: '', confirmPassword: '' }}
                validationSchema={yup.object({
                  username: yup.string()
                    .min(3, 'От 3 до 20 символов')
                    .max(20, 'От 3 до 20 символов')
                    .required('Обязательное поле'),
                  password: yup.string().min(6, 'Не менее 6 символов').required('Обязательное поле'),
                  confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Пароли должны совподать')
                })}
                onSubmit={onSubmit}
                values
                errors
                isValid
              // touched
              >
                {({
                  handleSubmit,
                  handleChange,
                  handleBlur,
                  values,
                  errors,
                  isValid,
                  touched
                }) => (
                  <Form onSubmit={handleSubmit} className='col-12 col-md-6 mt-3 mt-mb-0'>
                    <h1 className='text-center mb-4'>Регистрация</h1>
                    <Form.Group className='form-floating mb-3'>
                      <Field
                        as={Form.Control}
                        name="username"
                        placeholder="Имя пользователя"
                        value={values.username}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.username && errors.username}
                        required
                      />
                      <Form.Label htmlFor='username'>Имя пользователя</Form.Label>
                      <Form.Control.Feedback type="invalid" tooltip>
                        {!isValid && errors.username}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="form-floating mb-4">
                      <Field
                        as={Form.Control}
                        placeholder="Пароль"
                        name="password"
                        type="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                        autoComplete="current-password"
                        isInvalid={touched.password && errors.password}
                        required
                      />
                      <Form.Label htmlFor='password'>Пароль</Form.Label>
                      <Form.Control.Feedback type="invalid" tooltip>
                        {!isValid && errors.password}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="form-floating mb-4">
                      <Field
                        as={Form.Control}
                        name="confirmPassword"
                        type="password"
                        placeholder="Пароль"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.confirmPassword}
                        autoComplete="current-confirmPassword"
                        isInvalid={touched.confirmPassword && errors.confirmPassword}
                        required
                      />
                      <Form.Label htmlFor='confirmPassword'>Подтвердите пароль</Form.Label>
                      <Form.Control.Feedback type="invalid" tooltip>
                        {!isValid && errors.confirmPassword}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Button className='w-100 btn btn-outline-primary' variant="outline-primary" type="submit">
                      Зарегистрироваться
                    </Button>
                  </Form>
                )}
              </Formik>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container >
  )
}

export default SingupPage;