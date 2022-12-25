import { Box, Text } from '@chakra-ui/react';
import React from 'react';
import GoogleLogin from 'react-google-login';
import { useDispatch } from 'react-redux';
import { userLogin } from '../../redux/slices/login';

const Login = () => {
  const dispatch = useDispatch();
  const googleClientID =
    '1094987803842-lndm8ge3sb7m9ppd2m06as5dk1jcghpm.apps.googleusercontent.com';

  const responseGoogle = response => {
    dispatch(
      userLogin({
        accessToken: response.accessToken,
        profile: response.profileObj,
      })
    );
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection='column'
      h="100vh"
      bg='blackAlpha.400'
    >
      <Text fontSize='45px' color='red.400' fontWeight='600' mb='25px'>Ticket</Text>
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
