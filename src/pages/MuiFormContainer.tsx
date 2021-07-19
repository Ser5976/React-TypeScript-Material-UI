import React from 'react';
import {
  Container,
  FormControl,
  FormControlLabel,
  Radio,
  FormLabel,
  Grid,
  makeStyles,
  Paper,
  RadioGroup,
  TextField,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  Box,
  Icon,
  Button,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: 150,
    padding: '50px 25px',
    '& .MuiTextField-root': {
      marginBottom: 20,
      '& fieldset': {
        borderColor: '#1a237e',
      },
      '& label': {
        color: '#1a237e',
      },
    },
    '& .MuiIconButton-label': {
      color: '#1a237e',
    },
  },

  paper: {
    padding: '15px',
  },
  textTitle: {
    fontSize: '25px',
    textShadow: '1px 1px #9a0036',
    color: '#9a0036',
    marginBottom: 20,
  },
}));

const MuiFormContainer: React.FC = () => {
  const classes = useStyles();
  return (
    <Container maxWidth="sm" className={classes.container}>
      <Paper className={classes.paper}>
        <Typography align="center" className={classes.textTitle}>
          MuiForm!
        </Typography>
        <form noValidate>
          <Grid container spacing={8}>
            <Grid item md={6}>
              <TextField
                label="Full Name"
                variant="outlined"
                fullWidth
                size="medium"
                type="text"
              />
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                size="medium"
                type="email"
              />
            </Grid>
            <Grid item md={6}>
              <FormControl component="fieldset" style={{ marginBottom: 20 }}>
                <FormLabel component="legend" style={{ color: '#1a237e' }}>
                  Gender
                </FormLabel>
                <RadioGroup row>
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                  />
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />
                </RadioGroup>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel style={{ color: '#1a237e' }}>Developer</InputLabel>
                <Select style={{ color: '#1a237e' }}>
                  <MenuItem value="front-end">Front-end</MenuItem>
                  <MenuItem value="back-end">Back-end</MenuItem>
                  <MenuItem value="full-stack">Full-stack</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Box>
            <Button
              style={{ backgroundColor: '#9a0036' }}
              variant="contained"
              color="primary"
              fullWidth
              endIcon={<Icon>send</Icon>}
            >
              Send
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default MuiFormContainer;
