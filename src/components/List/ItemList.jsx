import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
// import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  makeStyles,
} from '@material-ui/core';
import Button from 'components/Home_MUI/Button';
import { Link } from 'react-router-dom';
// import getInitials from 'src/utils/getInitials';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 'none',
  },
  avatar: {
    marginRight: theme.spacing(2),
  },
  Table: {
    whidth: 'auto',
    margin: 'none',
  },
}));

// school-quiz,quiz-loader
/// este componente deberia recibir NOMBRE DE COLUMNAS, ROLE (estudiante,quiz)
const Results = ({ className, customers, whidth, columnName, ...rest }) => {
  const classes = useStyles();
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  // const [columna, setColumna] = useState(false);

  const handleSelectAll = (event) => {
    let newSelectedCustomerIds;

    if (event.target.checked) {
      newSelectedCustomerIds = customers.map((customer) => customer.id);
    } else {
      newSelectedCustomerIds = [];
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedCustomerIds.indexOf(id);
    let newSelectedCustomerIds = [];

    if (selectedIndex === -1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds,
        id
      );
    } else if (selectedIndex === 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(1)
      );
    } else if (selectedIndex === selectedCustomerIds.length - 1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(0, selectedIndex),
        selectedCustomerIds.slice(selectedIndex + 1)
      );
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      {/* <PerfectScrollbar> */}
      <Box Width={whidth ? whidth : 1}>
        <Table size={'small'} className={classes.Table}>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selectedCustomerIds.length === customers.length}
                  color="primary"
                  indeterminate={
                    selectedCustomerIds.length > 0 &&
                    selectedCustomerIds.length < customers.length
                  }
                  onChange={handleSelectAll}
                />
              </TableCell>
              {columnName.map((name) => {
                return <TableCell>{name}</TableCell>;
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.slice(0, limit).map((customer) => (
              <TableRow
                hover
                key={customer.id}
                selected={selectedCustomerIds.indexOf(customer.id) !== -1}
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedCustomerIds.indexOf(customer.id) !== -1}
                    onChange={(event) => handleSelectOne(event, customer.id)}
                    value="true"
                  />
                </TableCell>
                <TableCell>
                  <Box alignItems="center" display="flex">
                    <Avatar className={classes.avatar} src={customer.avatarUrl}>
                      {/* {getInitials(customer.name)} */}
                      {customer.name}
                    </Avatar>
                    <Typography color="textPrimary" variant="body1">
                      {customer.name}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>
                  {customer.address ? (
                    `${customer.address.city}, ${customer.address.state}, ${customer.address.country}`
                  ) : (
                    <Button>Trash</Button>
                  )}
                </TableCell>
                <TableCell>
                  {customer.phone ? customer.phone : <Button component={Link} to='/questionLoader'>Edit</Button>}
                </TableCell>
                {columnName.length === 4 ? null : (
                  <TableCell>
                    <Button>A??adir</Button>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
      {/* </PerfectScrollbar> */}
      <TablePagination
        component="div"
        count={customers.length}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  customers: PropTypes.array.isRequired,
};

export default Results;
