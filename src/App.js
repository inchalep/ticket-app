import React, { useEffect } from 'react';
import Home from './pages/home';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/navBar';
import { gapi } from 'gapi-script';
import Login from './pages/login';
import { useSelector } from 'react-redux';
function App() {
  const { user } = useSelector(state => state.login);
  const googleClientID =
    '1094987803842-lndm8ge3sb7m9ppd2m06as5dk1jcghpm.apps.googleusercontent.com';

  useEffect(() => {
    gapi.load('client:auth2', () => {
      gapi.client.init({
        clientId: googleClientID,
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
