import {Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Typography, Container, createTheme, ThemeProvider} from '@material-ui/core'
import { useState } from 'react';

import {Lock} from '@material-ui/icons'
import React from 'react'

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

const SignUp = (props) => {
  const [validEmail, setValidEmail] = useState(false)
  const [validPass, setValidPass] = useState(false)
  const [validPassRetype, setValidPassRetype] = useState(false)

    const createUser = async (params) => {
      const waiting = await fetch("http://localhost:3001/api/users" + '?' + new URLSearchParams(params)); 
      const response = await waiting.json();
      return response;
    }
    
      const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const user = data.get('username');
        const pass = data.get('password');
        const passRetype = data.get('passwordRetype');

        //add some checks for emptiness/if its a complete email

        if (pass !== passRetype) {
            alert("password and password retype are not equal")
        } else if (pass === '' || user === '') {
            alert("username and password field cannot be empty")
        } else {
          // const params = {username: data.get('email'), password: data.get('password')}

          // const formData = new FormData();
          // formData.append("firstName", 'notImplemented');
          // formData.append("lastName", 'notImplemented');
          // formData.append("email", 'notImplemented');
          // formData.append("stageName", 'notImplemented');
          // formData.append("birthday", 'notImplemented');
          // formData.append("bio", 'notImplemented');

          // formData.append("username", data.get('username'));
          // formData.append("password", data.get('songName'));

          const bodyData = {
            "userName": data.get('email'),
            "password": data.get('password'),
            "firstName": 'notImplemented',
            "lastName": 'notImplemented',
            "email": 'notImplemented',
            "stageName": 'notImplemented',
            "birthday": 'notImplemented',
            "bio": 'notImplemented'
          };
          
          fetch("http://localhost:3001/api/users", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(bodyData)
          }).then((response) => {
            console.log(response);
          }).catch((error) => {
            alert(error);
          });
          // createUser(params)
          // .then((data) => {
          //   if (data.created == true) {
          //     console.log("created new user")
          //     window.location.pathname = '/login'
          //   } else {
          //     console.log("user already exists")
          //   }
          //   alert(data.message);
          // })
        }
        
        console.log({
          email: data.get('email'),
          password: data.get('password'),
          passwordRetype: data.get('passwordRetype'),
        });
      };
    
    return (
        <>
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
            Sign Up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
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
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="passwordRetype"
              label="Retype Password"
              type="password"
              id="passwordRetype"
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
              </Grid>
              <Grid item>
                <Link href="login" variant="body2">
                  {"Already have an account? Login"}
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
        </>
    )
}

export default SignUp