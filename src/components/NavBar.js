import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from '../utils/consts';

const NavBar = observer(() => {
  const { user } = useContext(Context);
  const navigate = useNavigate();

  const logOut = () => {
    user.setUser({});
    user.setIsAuth(false);
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm py-3">
      <Container>
        <Navbar.Brand
          as={NavLink}
          to={SHOP_ROUTE}
          style={{
            color: 'white',
            fontSize: '1.75rem',
            fontWeight: '600',
            letterSpacing: '0.5px',
          }}
        >
          Ильдорадо
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto d-flex align-items-center gap-2">
            {user.isAuth ? (
              <>
                <Button
                  variant="outline-light"
                  onClick={() => navigate(ADMIN_ROUTE)}
                  className="px-4"
                  style={{ fontWeight: '500' }}
                >
                  Админ панель
                </Button>
                <Button
                  variant="outline-light"
                  onClick={() => logOut()}
                  className="px-4"
                  style={{ fontWeight: '500' }}
                >
                  Выйти
                </Button>
              </>
            ) : (
              <Button
                variant="outline-light"
                className="px-4"
                onClick={() => navigate(LOGIN_ROUTE)}
                style={{ fontWeight: '500' }}
              >
                Войти
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
});

export default NavBar;
