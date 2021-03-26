import React, { useState } from "react";


import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Button } from "@material-ui/core";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";



const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const rows = [
  { question: "Soy una Escuela ¿Como me Registro?", answer: `Puedes contactarnos para registrarte llenando el formulario "Estoy interesado"
   que se encuentra en la pagina de inicio`, id: 1,},
  { question: "¿Como se Crean los Quiz/Pruebas?", answer: "La escuela debe crear el quiz, en la barra lateral seleccione la opción Crear Quiz y llene el formulario, posteriormente añada los profesores que estarán autorizados a administrar ese Quiz", id: 2 },
  { question: "¿Como se crean las preguntas de un Quiz/Pruebas?", answer: "El profesor puede crear preguntas con sus respuestas luego de que una escuela lo añada como administrador de ese quiz, puede ver la lista de quizes en los que es administrador pulsando en el botón Lista Quizes que se encuentra en la barra lateral, luego en la tabla busque la columna PREGUNTAS y pulse el botón EDITAR en el quiz que busque editar las preguntas", id: 3 },
  { question: "Soy alumno ¿Donde puedo realizar las Quiz/Pruebas?", answer: "Las pruebas se pueden realizar desde la app, puedes encontrar los links de descarga en la pagina de inicio, luego de logearte en la app con el usuario que utilizaste para registrarte, debes enrolarte a los quizes que deseas realizar, para eso el profesor debe dar aprovacion a tu solicitud, puedes buscar el quiz filtrado por organizaciones pulsando en el botón con ese nombre en la barra lateral, allí selecciona tu escuela y enrólate en el quiz que deseas realizar. Finalmente en la barra lateral podrás ver pulsando el botón mis quizes, los quizes a los cuales has sido aprobado.", id: 4 },
];

const useStyles = makeStyles({
  table: {
    width: "78vw",
    border: "1px solid #e0e0e0",
  },
  paper_QandA: {
    display: "flex",
    width: "85vw",
    placeContent: "center",
    padding: "60px",
    margin: "60px",
  },
  div_QandA: {
    display: "flex",
    placeContent: "center",
  },
  arrow_center: {
    verticalAlign: "baseline",
  },
  tableBody: {
    verticalAlign: "baseline",
  },
  arrow_style: {
    width: '20px',
  },
});

function QandA() {

  const [open,setOpen] = useState(0)
  const classes = useStyles();

  const handleOpen = (id) => {
    if (open === id) {setOpen(0)}
    if (open !== id) {setOpen(id)}
  }

  return (
    <div className={classes.div_QandA}>
      <TableContainer className={classes.paper_QandA} component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableBody className={classes.tableBody}>
            {rows.map((row) => (
            <>
                <StyledTableRow className={classes.arrow_center} key={row.name}>
                    <StyledTableCell align="left">



                        <Button onClick={(e) => handleOpen(row.id)}><ArrowDownwardIcon /></Button>





                        {row.question}
                    </StyledTableCell>
                </StyledTableRow>

                {open === row.id ?
                <StyledTableRow id={row.id} key={row.name}>
                    <StyledTableCell Style="padding: 22px 45px;" >{row.answer}</StyledTableCell>
                </StyledTableRow> : null}
            </>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default QandA;
