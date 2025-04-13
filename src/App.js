import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Spinner } from 'react-bootstrap';
import AppRouter from './components/AppRouter';
import NavBar from './components/NavBar';
import { check } from './http/userAPI';
import { Context } from '.';

const App = observer(() => {
  const { user } = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    check()
      .then(userData => {
        if (userData) {
          user.setUser(userData);
          user.setIsAuth(true);
        } else {
          user.setUser(null);
          user.setIsAuth(false);
        }
      })
      .finally(() => setLoading(false));
  }, [user]);

  if (loading) {
    return <Spinner animation={'grow'} />;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <AppRouter />
    </BrowserRouter>
  );
});

export default App;
