import {
  Button,
  Flex,
  Icon,
  Input,
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import React from 'react';
import { FaEdit, FaSortAlphaDownAlt, FaTrash } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { useTable, useSortBy, usePagination } from 'react-table';
import { deleteTicket } from '../../redux/slices/ticket';

const TicketList = ({ tickets, setFormData, onOpen }) => {
  const dispatch = useDispatch();
  const columns = React.useMemo(
    () => [
      {
        Header: 'Id',
        accessor: 'id',
      },
      {
        Header: 'Type',
        accessor: 'type',
      },
      {
        Header: 'Module',
        accessor: 'module',
      },
      {
        Header: 'Last Update',
        accessor: 'lastupdate',
      },
      {
        Header: 'Priority',
        accessor: 'priority',
      },
      {
        Header: 'Title',
        accessor: 'title',
      },
      {
        Header: 'Status',
        accessor: 'status',
      },
    ],
    []
  );

  const data = React.useMemo(() => tickets, [tickets]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    useSortBy,
    usePagination
  );
  return (
    <TableContainer>
      <Flex pb="10px" alignItems="center" justifyContent="flex-end">
        <Button
          m="0 10px"
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          Prev
        </Button>{' '}
        <Button m="0 10px" onClick={() => nextPage()} disabled={!canNextPage}>
          Next
        </Button>{' '}
        <Text>
          Page {pageIndex + 1} of {pageOptions.length} | Go to page:{' '}
          <Input
            p="5px"
            textAlign="center"
            type="number"
            defaultValue={pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            w="50px"
          />
        </Text>{' '}
        <Select
          w="110px"
          ml="10px"
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </Select>
      </Flex>
      <Table variant="simple" {...getTableProps()}>
        <Thead>
          {headerGroups.map(headerGroup => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => {
                return (
                  <Th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    fontWeight="bold"
                    color="black"
                  >
                    {column.render('Header')}{' '}
                    <span>
                      <Icon as={FaSortAlphaDownAlt} />
                    </span>
                  </Th>
                );
              })}
              <Th>Actions</Th>
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <Tr
                {...row.getRowProps()}
                cursor="pointer"
                bg={
                  Object.values(row.values).includes('closed')
                    ? 'closedTr'
                    : Object.values(row.values).includes('delivered')
                    ? 'trBg'
                    : 'white'
                }
              >
                {row.cells.map(cell => {
                  return (
                    <Td
                      {...cell.getCellProps()}
                      fontWeight={
                        cell.column.Header === 'Id' ||
                        cell.column.Header === 'Type' ||
                        Object.values(row.values).includes('closed')
                          ? '600'
                          : '400'
                      }
                    >
                      <Text
                        as="span"
                        display="inline-block"
                        p={
                          cell.value === 'normal' ||
                          cell.value === 'blocking' ||
                          cell.value === 'needed'
                            ? '2px 5px'
                            : '0'
                        }
                        rounded={
                          cell.value === 'normal' ||
                          cell.value === 'blocking' ||
                          cell.value === 'needed'
                            ? 'md'
                            : '0'
                        }
                        lineHeight="17.3px"
                        bg={
                          cell.value === 'normal'
                            ? 'green'
                            : cell.value === 'blocking'
                            ? 'red.300'
                            : cell.value === 'needed'
                            ? 'orange'
                            : ''
                        }
                        color={
                          cell.value === 'normal'
                            ? 'white'
                            : cell.value === 'blocking'
                            ? 'white'
                            : cell.value === 'needed'
                            ? 'white'
                            : cell.value === 'bug'
                            ? 'red'
                            : cell.value === 'feature'
                            ? 'blue'
                            : cell.value === 'to do'
                            ? 'green'
                            : 'black'
                        }
                      >
                        {cell.render('Cell')}
                      </Text>
                    </Td>
                  );
                })}
                <Th>
                  <Text
                    as="span"
                    p="5px"
                    mr="5px"
                    onClick={() => {
                      onOpen();
                      setFormData(pre => ({ ...pre, id: row.values.id }));
                    }}
                  >
                    <Icon as={FaEdit} />
                  </Text>
                  <Text
                    as="span"
                    p="5px"
                    onClick={() => {
                      dispatch(deleteTicket(row.values.id));
                    }}
                  >
                    <Icon as={FaTrash} />
                  </Text>
                </Th>
              </Tr>
            );
          })}
        </Tbody>{' '}
      </Table>
    </TableContainer>
  );
};

export default TicketList;
