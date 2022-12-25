import {
  Box,
  Flex,
  Heading,
  ListItem,
  Text,
  UnorderedList,
} from '@chakra-ui/react';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { ColorModeSwitcher } from '../../ColorModeSwitcher';

const Navbar = () => {
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
                <Text
                  cursor="pointer"
                  color="#e33c3c"
                  fontWeight="400"
                  _hover={{ textDecor: 'underLine' }}
                >
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
