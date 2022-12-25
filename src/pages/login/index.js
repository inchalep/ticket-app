import { Box } from '@chakra-ui/react';
import React from 'react';
import GoogleLogin from 'react-google-login';
import { useDispatch } from 'react-redux';
import { userLogin } from '../../redux/slices/login';

const Login = () => {
  const dispatch = useDispatch();
  const googleClientID =
    '1094987803842-lndm8ge3sb7m9ppd2m06as5dk1jcghpm.apps.googleusercontent.com';

  const responseGoogle = response => {
    dispatch(userLogin({accessToken:response.accessToken,profile:response.profileObj}));
  };

  return (
    <Box>
      <GoogleLogin
        clientId={googleClientID}
        buttonText="Login"
        onSuccess={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />
    </Box>
  );
};

export default Login;
