import { SmallAddIcon } from '@chakra-ui/icons';
import {
  Box,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import TicketForm from '../../components/ticketForm';
import TicketList from '../../components/TicketList';

const Home = () => {
  const [formData, setFormData] = useState({
    type: '',
    module: '',
    priority: '',
    title: '',
    status: '',
    id: '',
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { tickets } = useSelector(state => state.tickets);

  return (
    <Box h="91vh" pt="45px">
      <Box m="35px 0" bg="headingBg">
        <Flex
          p="15px 0"
          justifyContent="space-between"
          alignItems="center"
          className="wrapper"
        >
          <Text color="green.600" fontWeight="bold">
            Tickets
          </Text>
          <Box
            p="5px"
            border="1px"
            onClick={onOpen}
            rounded="md"
            cursor="pointer"
          >
            <SmallAddIcon boxSize={6} />
          </Box>
        </Flex>
      </Box>
      <Box className="wrapper">
        <TicketList
          tickets={tickets}
          setFormData={setFormData}
          onOpen={onOpen}
        />
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <TicketForm
              formData={formData}
              setFormData={setFormData}
              onClose={onClose}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Home;
