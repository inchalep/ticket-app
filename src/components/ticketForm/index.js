import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  Text,
} from '@chakra-ui/react';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTicket, updateTicket } from '../../redux/slices/ticket';

const TicketForm = ({ formData, setFormData, onClose }) => {
  const [errs, setErrs] = useState({});
  const dispatch = useDispatch();
  const { tickets } = useSelector(state => state.tickets);
  
  useEffect(() => {
    getTicketData();
  }, []);

  const getTicketData = () => {
    if (formData.id) {
      const ticket = tickets?.find(ticket => ticket.id === formData.id);
      setFormData(ticket);
    }
  };
  const inputHandler = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fieldValidation = () => {
    const errors = {};
    const { type, module, priority, title, status } = formData;
    if (!type) {
      errors.type = 'Please select type.';
    }
    if (!module) {
      errors.module = 'Please select module.';
    }
    if (!priority) {
      errors.priority = 'Please select priority.';
    }
    if (!title) {
      errors.title = 'Please enter title.';
    }
    if (!status) {
      errors.status = 'Please select status.';
    }
    return errors;
  };

  const reset = () => {
    setFormData({
      type: '',
      module: '',
      priority: '',
      title: '',
      status: '',
      id: '',
    });
    onClose();
  };

  const formHandler = e => {
    e.preventDefault();
    setErrs(fieldValidation());
    const valid = fieldValidation();
    if (Object.keys(valid).length === 0) {
      if (formData.id) {
        dispatch(
          updateTicket({
            ...formData,
            lastupdate: format(new Date(), 'yyyy MMM d - k:m '),
          })
        );
      } else {
        dispatch(
          createTicket({
            ...formData,
            id: `#${tickets.length + 1}`,
            lastupdate: format(new Date(), 'yyyy MMM d - k:m '),
          })
        );
      }
      reset()
    }
  };

  return (
    <Box m="25px auto">
      <Text
        m="15px 0"
        color="red.400"
        fontWeight="600"
        fontSize="35px"
        textAlign="center"
      >
        Ticket
      </Text>
      <form onSubmit={formHandler}>
        <FormControl isInvalid={errs.type} pb="10px">
          <FormLabel>Type:</FormLabel>
          <Select
            placeholder="Select type"
            value={formData.type}
            name="type"
            onChange={inputHandler}
          >
            <option value="bug">Bug</option>
            <option value="todo">To Do</option>
            <option value="feature">Feature</option>
          </Select>
          <FormErrorMessage>{errs.type}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errs.module} pb="10px">
          <FormLabel>Module:</FormLabel>
          <Select
            placeholder="Select module"
            name="module"
            value={formData.module}
            onChange={inputHandler}
          >
            <option value="backoffice">back office</option>
          </Select>
          <FormErrorMessage>{errs.module}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errs.priority} pb="10px">
          <FormLabel>Priority:</FormLabel>
          <Select
            placeholder="Select priority"
            name="priority"
            value={formData.priority}
            onChange={inputHandler}
          >
            <option value="normal">Normal</option>
            <option value="blocking">Blocking</option>
            <option value="needed">Needed</option>
          </Select>
          <FormErrorMessage>{errs.priority}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errs.title} pb="10px">
          <FormLabel>Title:</FormLabel>
          <Input
            name="title"
            value={formData.title}
            type="text"
            onChange={inputHandler}
          />
          <FormErrorMessage>{errs.title}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errs.status} pb="10px">
          <FormLabel>Status:</FormLabel>
          <Select
            placeholder="Select Status"
            name="status"
            value={formData.status}
            onChange={inputHandler}
          >
            <option value="delivered">Delivered</option>
            <option value="closed">Closed</option>
            <option value="new">New</option>
          </Select>
          <FormErrorMessage>{errs.status}</FormErrorMessage>
        </FormControl>
        <Button w="full" mt="20px" type="submit" colorScheme="teal">
          {formData.id ? 'Update' : 'Save'}
        </Button>
      </form>
    </Box>
  );
};

export default TicketForm;
