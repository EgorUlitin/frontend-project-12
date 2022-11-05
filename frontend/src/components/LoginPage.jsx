import axios from 'axios';
import cn from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from '../hooks/index.jsx';
import routes from '../routes/routes.js';
import * as yup from 'yup';

import image from '../image.jpg'

let schema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
});

const LoginPage = () => {
  const [authFailed, setAuthFailed] = useState(false);

  const inputRef = useRef();
  const auth = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      setAuthFailed(false);

      schema.validate(values)
        .then(async (values) => {
          const res = await axios.post(routes.loginPath(), values);
          localStorage.setItem('user', JSON.stringify(res.data));
          auth.logIn();
          const { from } = location.state || { from: { pathname: '/' } };
          navigate(from);
        })
        .catch(() => setAuthFailed(true));
    },
  });

  const inputStyle = cn({ 'is-invalid': authFailed });

  return <Container className='h-100' fluid>
    <Row className="justify-content-center align-content-center h-100">
      <Col className='col-12 col-md-8 col-xxl-6'>
        <Card className="shadow-sm">
          <Card.Body className='row p-5'>
            <div className='col-12 col-md-6 d-flex align-items-center justify-content-center'>
              <Card.Img className='rounded-circle' variant="center" src={image} />
            </div>
            <Form onSubmit={formik.handleSubmit} className='col-12 col-md-6 mt-3 mt-mb-0'>
              <h1 className='text-center mb-4'>Войти</h1>
              <Form.Group className='form-floating mb-3'>
                <Form.Control
                  className={inputStyle}
                  onChange={formik.handleChange}
                  value={formik.values.username}
                  id="username"
                  name="username"
                  autoComplete="username"
                  placeholder="Ваш ник"
                  required
                  ref={inputRef}
                />
                <Form.Label htmlFor='formName'>Ваш ник</Form.Label>
              </Form.Group>
              <Form.Group className="form-floating mb-4">
                <Form.Control
                  className={inputStyle}
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  id="password"
                  type="password"
                  name="password"
                  autoComplete="current-password"
                  placeholder="Пароль"
                  required
                />
                <Form.Label htmlFor='formPassword'>Пароль</Form.Label>
                {authFailed && <div className='invalid-tooltip'>
                  Неверные имя пользователя или пароль
                </div>}
              </Form.Group>
              <Button className='w-100 mb-3 btn btn-outline-primary' variant="outline-primary" type="submit">
                Войти
              </Button>
            </Form>
          </Card.Body>
          <Card.Footer className='p-4'>
            <div className='text-center'>
              <span>Нет аккаунта? </span>
              <Link to="/signup">Регистрация</Link>
            </div>
          </Card.Footer>
        </Card>
      </Col>
    </Row>
  </Container>
}

export default LoginPage;