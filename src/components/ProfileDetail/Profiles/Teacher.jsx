import React, { useEffect, useState } from 'react';
import {

  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  Container,
  makeStyles,
  Button,
  Avatar
} from '@material-ui/core';
import { Formik, Form } from "formik";
import { useAuth } from 'components/Auth/AuthContext';
import { authStatusSelector } from 'utils/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { userUpdate } from 'views/Profiles/profileSlice';

const useStyles = makeStyles(() => ({
  root: {},
  avatar:{
    height:'50%',
    width:'50%',
    margin:'auto',
  },
}));
let initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  cellphone: '',
  photo:'',
}

function Teacher() {
  const user = useAuth()
  const authStatus = useSelector(authStatusSelector)
  const dispatch = useDispatch()
  const classes = useStyles()
  const [values, setValues] = useState({
        firstName: '',
        lastName: '',
        email: '',
        cellphone: '',
        photo:'',
        });
  useEffect(()=>{
    
    if(authStatus === 'success'){
      console.log('entre')
    
      setValues({    
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        cellphone: user.cellphone,
        photo:user.photo,
        birthdate:user.birthdate,
        })
    }
  },[authStatus])
  
  const handleChange = (event) => {
        setValues({
          ...values,
          [event.target.name]: event.target.value
        });
      };

const handleSubmit = (v,formik)=>{
  console.log(values)
  values.cellphone = parseInt(values.cellphone)
   dispatch(userUpdate({id:user.id, values}))
}

    return (
        <Container>
       
        <Formik onSubmit={handleSubmit} initialValues={ initialValues }>
          {(formik) => (
            <Form>

        <CardHeader
          subheader="Puedes editar la tu informacion personal aqui"
          title="Editar Perfil"   
             
        />
            <Avatar alt="Remy Sharp" src={values.photo} className={classes.avatar} />
         
               <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="First name"
                name="firstName"
                onChange={handleChange}
                required
                value={values.firstName}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
            <TextField
                fullWidth
                label="Last name"
                name="lastName"
                onChange={handleChange}
                required
                value={values.lastName}
                variant="outlined"
              />
            </Grid>
            {/* <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                onChange={handleChange}
                required
                value={values.email}
                variant="outlined"
              />
            </Grid> */}
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Phone Number"
                name="cellphone"
                onChange={handleChange}
                type="number"
                value={values.cellphone}
                variant="outlined"
              /> 
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
          <TextField            
             label="URl de tu imagen"
             name="photo" 
             value={values.photo}
             onChange={handleChange}
              />

            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                name="birthdate"
                onChange={handleChange}
                type="date"
                variant="outlined"
                value={values.birthdate}

              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
            </Grid>
          </Grid>
          <Button type='submit'> enviar</Button>
        </CardContent> 
        </Form>
        )}
      </Formik>
    </Container>
  );
    
}

export default Teacher
