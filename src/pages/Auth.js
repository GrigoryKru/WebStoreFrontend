import React, { useContext, useState } from 'react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from '../utils/consts';
import { login, registration } from '../http/userAPI';
import { Context } from '..';

const Auth = observer(() => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(Context);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const isLogin = location.pathname === LOGIN_ROUTE;

  const click = async (e) => {
    e.preventDefault();
    try {
      let data;
      if (isLogin) {
        data = await login(email, password);
      } else {
        data = await registration(email, password);
      }
      user.setUser(data);
      user.setAuth(true);
      navigate(SHOP_ROUTE);
    } catch (e) {
      alert(e.response.data.message);
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: 'calc(100vh - 54px)' }}
    >
      <Card style={{ width: 600 }} className="p-5">
        <h2 className="m-auto">{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
        <Form className="d-flex flex-column">
          <Form.Control
            className="mt-3"
            placeholder="Введите ваш email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Control
            className="mt-3"
            placeholder="Введите ваш пароль..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          <Row className="mt-3 align-items-center">
            <Col>
              {isLogin ? (
                <NavLink to={REGISTRATION_ROUTE}>Регистрация</NavLink>
              ) : (
                <NavLink to={LOGIN_ROUTE}>Вход</NavLink>
              )}
            </Col>
            <Col className="text-end">
              <Button variant="primary" onClick={click} type="submit">
                {isLogin ? 'Войти' : 'Зарегистрироваться'}
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>
    </Container>
  );
});

export default Auth;
