import {
  Box,
  Flex,
  Heading,
  ListItem,
  Text,
  UnorderedList,
} from '@chakra-ui/react';
import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { ColorModeSwitcher } from '../../ColorModeSwitcher';
import { userLogOut } from '../../redux/slices/login';

const Navbar = () => {
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(userLogOut());
  };
  return (
    <header>
      <Box p="10px 0" shadow="md">
        <Flex
          alignItems="center"
          justifyContent="space-between"
          className="wrapper"
        >
          <Heading as="h1" color="red.400">
            <NavLink to="/">
              <Text as="span">Ticket</Text>
            </NavLink>
          </Heading>
          <Flex alignItems="center">
            <UnorderedList
              listStyleType="none"
              display="flex"
              alignItems="center"
              gap="3"
            >
              <ListItem>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? 'nav-active' : undefined
                  }
                >
                  Home
                </NavLink>
              </ListItem>
              <ListItem>
                <Text color="#e33c3c" onClick={logout} cursor="pointer">
                  Logout
                </Text>
              </ListItem>
            </UnorderedList>
            <ColorModeSwitcher />
          </Flex>
        </Flex>
      </Box>
    </header>
  );
};

export default Navbar;
