import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
// import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  makeStyles,
} from '@material-ui/core';
import Button from 'components/Home_MUI/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 'none',
  },
  avatar: {
    marginRight: theme.spacing(2),
  },
  button: {
    padding: '16px 5px',
  },
  Table: {
    whidth: 'auto',
    margin: 'none',
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const Results = ({
  className,
  customers = [],
  whidth,
  columnName,
  ButtonName,
  User,
  actions,
  propsNames,
  ...rest
}) => {
  const classes = useStyles();
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  let btnProps = [
    'Añadir',
    'Editar',
    'Borrar',
    'Activar',
    'Enrollar',
    'Aceptar',
    'Rechazar',
    'Ver',
  ];

  if (propsNames.length !== columnName.length) {
    throw new Error('Las propiedades y las columnas no coinciden');
  }

  for (const key in actions) {
    if (Object.hasOwnProperty.call(actions, key)) {
      const element = actions[key];
      if (typeof element !== 'function') {
        throw new Error(`La accion ${key} no es una funcion`);
      }
      if (!btnProps.includes(key)) {
        throw new Error(`La accion ${key} no esta en btnProps`);
      }
    }
  }

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
      {customers[0] ? (
        <>
          <Box Width={whidth ? whidth : 1}>
            <Table size={'small'} className={customers ? 's' : null}>
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
                {customers.map((info) => (
                  <TableRow
                    hover
                    key={info.id}
                    selected={selectedCustomerIds.indexOf(info.id) !== -1}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedCustomerIds.indexOf(info.id) !== -1}
                        onChange={(event) => handleSelectOne(event, info.id)}
                        value="true"
                      />
                    </TableCell>
                    {propsNames.map((prop) => {
                      if (btnProps.includes(prop)) {
                        return (
                          <TableCell>
                            <Button
                              className={classes.button}
                              name={prop}
                              id={info.id}
                              onClick={() => actions[prop](info.id)}
                            >
                              {/* {prop === 'Activar' ? info.active ? 'Desactivar' : 'Activar' : prop} */}
                              {prop === 'Activar' ? info.active  ? 'Desactivar' : 'Activar' : prop}


                            </Button>
                          </TableCell>
                        );
                      }
                      // puse este if porque a la info de subjects la recibe dentro de otro objeto
                      if (typeof info[prop] === 'object') {
                        return (
                          <TableCell>
                            {info[prop].name ? info[prop].name : '-'}
                          </TableCell>
                        );
                      } else {
                        return (
                          <TableCell>
                            {info[prop] ||
                            typeof info[prop] === 'boolean' ||
                            info[prop] === 0
                              ?  typeof info[prop] === 'boolean' ? info[prop] === false ? 'Deshabilitado' : 'Habilitado': info[prop] + ''
                              : '-'}
                          </TableCell>
                        );
                      }
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
          <TablePagination
            component="div"
            count={customers.length}
            onChangePage={handlePageChange}
            onChangeRowsPerPage={handleLimitChange}
            page={page}
            rowsPerPage={limit}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </>
      ) : null}
    </Card>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  customers: PropTypes.array.isRequired,
};

export default Results;
