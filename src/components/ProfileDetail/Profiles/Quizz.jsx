import React, { useState } from 'react';
import {
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  makeStyles
} from '@material-ui/core';


function Quizz () {

    const handleChange = (event) => {
        setValues({
          ...values,
          [event.target.name]: event.target.value
        });
      };

    const [values, setValues] = useState({
        name: 'Final test',
        category: 'History',
        subject: 'History of Science',
        description: 'xxxxxxxxxxxx xxxxxx xxxxxx xxxxxx xxxxxx'
      });
    return (
        <>
        <CardHeader
          subheader="The information can be edited"
          title="Quizz"
        />
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
                label= 'Name'
                name="name"
                onChange={handleChange}
                required
                value={values.name}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            ><TextField
              fullWidth
              label="Category"
              name="category"
              onChange={handleChange}
              required
              value={values.category}
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
            label="Subject"
            name="subject"
            onChange={handleChange}
            value={values.subject}
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
                label="Description"
                name="description"
                onChange={handleChange}
                required
                value={values.description}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        </>
    )
}

export default Quizz