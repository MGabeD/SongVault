import * as React from 'react';

import {Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Typography, Container, createTheme, ThemeProvider} from '@material-ui/core'
import {Lock} from '@material-ui/icons'

import { PropTypes } from '@material-ui/core';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        SongVault
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn(props) {
  const validateLogin = async (params) => {
    console.log(JSON.stringify(params));
    const response = await fetch('http://localhost:3001/api/auth' + '?' + new URLSearchParams(params))
    const valid = await response.json();
    console.log(valid);
    return valid;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    props.setLoginStatus(true);
    console.log(props.loginStatus);
    const params = {
      "userName": data.get('email'), 
      "password": data.get('password')
    }

    validateLogin(params)
    .then((valid) => { // waits for async response
      if (valid.message === "User found.") { // server validated username/password combo
        // props.setLoginStatus(valid.valid);
        
        // setting localStorage for userID and loginStatus
        localStorage.setItem('loginStatus', 'valid')
        localStorage.setItem('userID', valid.userId)

        // DeleteMe
        alert("UserID: " + localStorage.getItem('userID'))
        alert("Login Status: " + localStorage.getItem('loginStatus'))

        // pathing to the account page
        window.location.pathname = '/account'
      } else { 
        // not valid suername/password
        alert("incorrect username or password");
      }
    })   
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: 'white'
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }} style={{marginTop: '200px'}}>
            <Lock />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Username or Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                {/* <Link href="#" variant="body2">
                  Forgot password?
                </Link> */}
              </Grid>
              <Grid item>
                <Link href="signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <footer style={{minHeight: '23vh'}}>
              
        </footer>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
    
  );
}