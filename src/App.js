import React, { useEffect } from 'react';
import Home from './pages/home';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/navBar';
import { gapi } from 'gapi-script';
import Login from './pages/login';
import { useSelector } from 'react-redux';
import { oAuth } from './constants/oAuth';
function App() {
  const { user } = useSelector(state => state.login);

  useEffect(() => {
    gapi.load('client:auth2', () => {
      gapi.client.init({
        clientId: oAuth.CLIENT_ID,
      });
    });
  }, []);
  return (
    <>
      {!user.accessToken ? (
        <Login />
      ) : (
        <>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </>
      )}
    </>
  );
}

export default App;
